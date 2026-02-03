import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

import msgRoutes from "./routes/msg.route.js";
import path from "path";



dotenv.config();
const app=express();
const _dirname=path.resolve();


console.log(process.env.PORT);
const port=process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/msg",msgRoutes);

if(process.env.NODE_ENV==="production"){
app.use(express.static(path.join(_dirname,"../frontend/dist")))
app.get("*",(
    _,res)=>{
    res.sendFile(path.join(_dirname,"../frontend/dist/index.html"));
});
}

app.listen(port,()=>{
    console.log(`"server is running at port:${port}`)});
    