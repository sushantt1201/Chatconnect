import mongoose from "mongoose";

export const connectDb= async ( )=>{

    try{const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected",conn.connection.host);

    }catch(error){
console.error("failed to connnect to mongodb:",error);
process.exit(1);  //1 mesansd failed 0 means succcesss;
    }
};