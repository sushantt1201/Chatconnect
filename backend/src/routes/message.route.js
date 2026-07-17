import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  deleteMessage,
  getAllContacts,
  getChatPartners,
  getMessageByUserId,
  markConversationAsRead,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);
router.patch("/read/:id", markConversationAsRead);
router.delete("/:id", deleteMessage);

export default router;
