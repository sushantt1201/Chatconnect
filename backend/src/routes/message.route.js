import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessageByUserId ,sendMessage,getChatPartners,getAllContacts} from "../controllers/message.controller.js";
import {arcjetProtection} from"../middleware/arcjet.middleware.js";
const router=express.Router();


router.use(arcjetProtection);


router.get("/contacts",protectRoute,getAllContacts);

router.get("/chats",protectRoute,getChatPartners);
router.get("/:id",protectRoute,getMessageByUserId);
router.post("/send/:id",protectRoute,sendMessage);


export default router;