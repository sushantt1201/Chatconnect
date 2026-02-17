import express from "express";

const router=express.Router();

import { signup,login,logout,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import arcjet from "@arcjet/node";


router.post("/signup",signup);

// router.use(arcjetProtection);

router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,(req,res)=>res.status(200).json(req.user));


export default router;
