import express from "express";

const router=express.Router();



router.get("/signup",(req,res)=>{
    res.send("Signup endpoint");
})
router.get("/login",(req,res)=>{
    res.send("login endpoint");
})
router.get("/logout",(req,res)=>{
    res.send("logout endpoint");
})
router.get("/update",(req,res)=>{
    res.send("update endpoint");
})
export default router;
