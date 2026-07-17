import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

const updateUnread = (items, userId, count) =>
  items.map((item) =>
    String(item._id) === String(userId)
      ? { ...item, unreadCount: count }
      : item,
  );

const removeMessage = (messages, messageId) =>
  messages.filter(
    (message) => String(message._id) !== String(messageId),
  );

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  searchQuery: "",
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadCount: 0,
  firstUnreadMessageId: null,
  subscribedSocket: null,
  isSoundEnabled:
    JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  setActiveTab: (activeTab) => set({ activeTab }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  toggleSound: () => {
    const value = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(value));
    set({ isSoundEnabled: value });
  },

  setSelectedUser: (user) => {
    if (!user) {
      set({
        selectedUser: null,
        messages: [],
        unreadCount: 0,
        firstUnreadMessageId: null,
      });
      return;
    }

    set((state) => ({
      selectedUser: { ...user, unreadCount: 0 },
      messages: [],
      unreadCount: user.unreadCount || 0,
      firstUnreadMessageId: null,
      chats: updateUnread(state.chats, user._id, 0),
      allContacts: updateUnread(
        state.allContacts,
        user._id,
        0,
      ),
    }));
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });

    try {
      const response = await axiosInstance.get("/messages/contacts");
      set({ allContacts: response.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load contacts.",
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });

    try {
      const response = await axiosInstance.get("/messages/chats");
      set({ chats: response.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load chats.",
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  openConversation: async (user) => {
    get().setSelectedUser(user);
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(
        `/messages/${user._id}`,
      );

      const {
        messages,
        unreadCount,
        firstUnreadMessageId,
      } = response.data;

      set({
        messages,
        unreadCount,
        firstUnreadMessageId,
      });

      // Persist the cleared unread state immediately.
      if (unreadCount > 0) {
        const readResponse = await axiosInstance.patch(
          `/messages/read/${user._id}`,
        );

        const readIds = new Set(
          readResponse.data.messageIds.map(String),
        );

        set((state) => ({
          messages: state.messages.map((message) =>
            readIds.has(String(message._id))
              ? {
                  ...message,
                  deliveredAt: readResponse.data.readAt,
                  readAt: readResponse.data.readAt,
                }
              : message,
          ),
          unreadCount: 0,
          firstUnreadMessageId: null,
          chats: updateUnread(state.chats, user._id, 0),
          allContacts: updateUnread(
            state.allContacts,
            user._id,
            0,
          ),
        }));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to open conversation.",
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    const user =
      get().selectedUser ||
      get().chats.find(
        (chat) => String(chat._id) === String(userId),
      );

    if (user) {
      await get().openConversation(user);
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    if (!selectedUser) return;

    const tempId = `temp-${Date.now()}`;

    set((state) => ({
      messages: [
        ...state.messages,
        {
          _id: tempId,
          senderId: authUser._id,
          receiverId: selectedUser._id,
          text: messageData.text,
          image: messageData.image,
          createdAt: new Date().toISOString(),
          deliveredAt: null,
          readAt: null,
          isOptimistic: true,
        },
      ],
    }));

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );

      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === tempId ? response.data : message,
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: removeMessage(state.messages, tempId),
      }));

      toast.error(
        error.response?.data?.message || "Unable to send message.",
      );
    }
  },

  deleteMessage: async (messageId) => {
    if (String(messageId).startsWith("temp-")) return;

    const backup = get().messages;

    set((state) => ({
      messages: removeMessage(state.messages, messageId),
    }));

    try {
      await axiosInstance.delete(`/messages/${messageId}`);
    } catch (error) {
      set({ messages: backup });
      toast.error(
        error.response?.data?.message ||
          "Unable to delete message.",
      );
    }
  },

  subscribeToRealtime: (socket) => {
    if (!socket?.connected) return;

    const previousSocket = get().subscribedSocket;

    if (previousSocket && previousSocket !== socket) {
      previousSocket.off("newMessage");
      previousSocket.off("messagesRead");
      previousSocket.off("messageDeleted");
    }

    socket.off("newMessage");
    socket.off("messagesRead");
    socket.off("messageDeleted");

    socket.on("newMessage", (message) => {
      const state = get();
      const senderId = String(message.senderId);
      const isOpen =
        String(state.selectedUser?._id) === senderId;

      if (isOpen) {
        set((current) => ({
          messages: [...current.messages, message],
          chats: updateUnread(current.chats, senderId, 0),
          allContacts: updateUnread(
            current.allContacts,
            senderId,
            0,
          ),
        }));

        // The conversation is currently open, so mark it read.
        axiosInstance
          .patch(`/messages/read/${senderId}`)
          .then((response) => {
            const ids = new Set(
              response.data.messageIds.map(String),
            );

            set((current) => ({
              messages: current.messages.map((item) =>
                ids.has(String(item._id))
                  ? {
                      ...item,
                      deliveredAt: response.data.readAt,
                      readAt: response.data.readAt,
                    }
                  : item,
              ),
              chats: updateUnread(current.chats, senderId, 0),
              allContacts: updateUnread(
                current.allContacts,
                senderId,
                0,
              ),
            }));
          })
          .catch(console.error);
      } else {
        const currentChatCount =
          state.chats.find(
            (chat) => String(chat._id) === senderId,
          )?.unreadCount || 0;

        const currentContactCount =
          state.allContacts.find(
            (contact) => String(contact._id) === senderId,
          )?.unreadCount || 0;

        set({
          chats: updateUnread(
            state.chats,
            senderId,
            currentChatCount + 1,
          ),
          allContacts: updateUnread(
            state.allContacts,
            senderId,
            currentContactCount + 1,
          ),
        });

        get().getMyChatPartners();
      }

      if (state.isSoundEnabled) {
        const audio = new Audio("/sounds/notification.mp3");
        audio.play().catch(() => {});
      }
    });

    socket.on("messagesRead", ({ messageIds, readAt }) => {
      const ids = new Set(messageIds.map(String));

      set((state) => ({
        messages: state.messages.map((message) =>
          ids.has(String(message._id))
            ? { ...message, deliveredAt: readAt, readAt }
            : message,
        ),
      }));
    });

    socket.on("messageDeleted", ({ messageId }) => {
      set((state) => ({
        messages: removeMessage(state.messages, messageId),
      }));

      get().getMyChatPartners();
    });

    set({ subscribedSocket: socket });
  },

  unsubscribeFromRealtime: (socket) => {
    const target = socket || get().subscribedSocket;

    target?.off("newMessage");
    target?.off("messagesRead");
    target?.off("messageDeleted");

    set({ subscribedSocket: null });
  },

  // Compatibility aliases.
  subscribeToMessages: (socket) =>
    get().subscribeToRealtime(
      socket || useAuthStore.getState().socket,
    ),

  unsubscribeFromMessages: (socket) =>
    get().unsubscribeFromRealtime(socket),
}));
