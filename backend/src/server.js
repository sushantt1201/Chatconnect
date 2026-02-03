import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

import msgRoutes from "./routes/msg.route.js";



dotenv.config();
const app=express();


console.log(process.env.PORT);
const port=process.env.PORT;

app.use("/api/auth",authRoutes);
app.use("/api/msg",msgRoutes);

app.listen(port,()=>{
    console.log(`"server is running at port:${port}`)});
    