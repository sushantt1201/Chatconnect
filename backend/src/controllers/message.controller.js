import cloudinary from "../lib/cloudinary.js";
import {
  emitToUser,
  getReceiverSocketIds,
} from "../lib/socket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const getUnreadMap = async (receiverId) => {
  const unreadCounts = await Message.aggregate([
    {
      $match: {
        receiverId,
        readAt: null,
      },
    },
    {
      $group: {
        _id: "$senderId",
        count: { $sum: 1 },
      },
    },
  ]);

  return new Map(
    unreadCounts.map((entry) => [
      entry._id.toString(),
      entry.count,
    ]),
  );
};

export const getAllContacts = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const [users, unreadMap] = await Promise.all([
      User.find({ _id: { $ne: currentUserId } }).select("-Password"),
      getUnreadMap(currentUserId),
    ]);

    const contacts = users.map((user) => ({
      ...user.toObject(),
      unreadCount: unreadMap.get(user._id.toString()) || 0,
    }));

    return res.status(200).json(contacts);
  } catch (error) {
    console.error("getAllContacts:", error);
    return res.status(500).json({
      message: "Unable to load contacts.",
    });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.id;

    const messages = await Message.find({
      $or: [
        {
          senderId: currentUserId,
          receiverId: otherUserId,
        },
        {
          senderId: otherUserId,
          receiverId: currentUserId,
        },
      ],
    }).sort({ createdAt: 1 });

    const unreadMessages = messages.filter(
      (message) =>
        String(message.senderId) === String(otherUserId) &&
        String(message.receiverId) === String(currentUserId) &&
        !message.readAt,
    );

    return res.status(200).json({
      messages,
      unreadCount: unreadMessages.length,
      firstUnreadMessageId: unreadMessages[0]?._id || null,
    });
  } catch (error) {
    console.error("getMessageByUserId:", error);
    return res.status(500).json({
      message: "Unable to load messages.",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const text = req.body.text?.trim() || "";
    const image = req.body.image;

    if (!text && !image) {
      return res.status(400).json({
        message: "Text or image is required.",
      });
    }

    if (String(senderId) === String(receiverId)) {
      return res.status(400).json({
        message: "You cannot message yourself.",
      });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({
        message: "Receiver not found.",
      });
    }

    let imageUrl = "";

    if (image) {
      const upload = await cloudinary.uploader.upload(image);
      imageUrl = upload.secure_url;
    }

    const receiverIsOnline =
      getReceiverSocketIds(receiverId).length > 0;

    const message = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      deliveredAt: receiverIsOnline ? new Date() : null,
    });

    emitToUser(receiverId, "newMessage", message);

    return res.status(201).json(message);
  } catch (error) {
    console.error("sendMessage:", error);
    return res.status(500).json({
      message: "Unable to send message.",
    });
  }
};

export const markConversationAsRead = async (req, res) => {
  try {
    const receiverId = req.user._id;
    const senderId = req.params.id;
    const readAt = new Date();

    const unreadMessages = await Message.find({
      senderId,
      receiverId,
      readAt: null,
    }).select("_id");

    const messageIds = unreadMessages.map((message) =>
      message._id.toString(),
    );

    if (messageIds.length > 0) {
      await Message.updateMany(
        { _id: { $in: messageIds } },
        {
          $set: {
            deliveredAt: readAt,
            readAt,
          },
        },
      );

      emitToUser(senderId, "messagesRead", {
        readerId: receiverId.toString(),
        messageIds,
        readAt,
      });
    }

    return res.status(200).json({
      updatedCount: messageIds.length,
      messageIds,
      readAt,
    });
  } catch (error) {
    console.error("markConversationAsRead:", error);
    return res.status(500).json({
      message: "Unable to update read status.",
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    if (String(message.senderId) !== String(currentUserId)) {
      return res.status(403).json({
        message: "You can delete only messages you sent.",
      });
    }

    const payload = {
      messageId: message._id.toString(),
      senderId: message.senderId.toString(),
      receiverId: message.receiverId.toString(),
    };

    await message.deleteOne();

    emitToUser(payload.senderId, "messageDeleted", payload);
    emitToUser(payload.receiverId, "messageDeleted", payload);

    return res.status(200).json(payload);
  } catch (error) {
    console.error("deleteMessage:", error);
    return res.status(500).json({
      message: "Unable to delete message.",
    });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId },
        { receiverId: currentUserId },
      ],
    }).sort({ createdAt: -1 });

    const partners = new Map();

    for (const message of messages) {
      const sentByCurrentUser =
        String(message.senderId) === String(currentUserId);

      const partnerId = sentByCurrentUser
        ? message.receiverId.toString()
        : message.senderId.toString();

      if (!partners.has(partnerId)) {
        partners.set(partnerId, {
          unreadCount: 0,
          lastMessage: {
            text: message.text,
            image: message.image,
            createdAt: message.createdAt,
            senderId: message.senderId,
          },
        });
      }

      if (!sentByCurrentUser && !message.readAt) {
        partners.get(partnerId).unreadCount += 1;
      }
    }

    const partnerIds = [...partners.keys()];

    const users = await User.find({
      _id: { $in: partnerIds },
    }).select("-Password");

    const userMap = new Map(
      users.map((user) => [
        user._id.toString(),
        user.toObject(),
      ]),
    );

    const chatPartners = partnerIds
      .map((partnerId) => {
        const user = userMap.get(partnerId);
        return user
          ? {
              ...user,
              ...partners.get(partnerId),
            }
          : null;
      })
      .filter(Boolean);

    return res.status(200).json(chatPartners);
  } catch (error) {
    console.error("getChatPartners:", error);
    return res.status(500).json({
      message: "Unable to load chats.",
    });
  }
};
