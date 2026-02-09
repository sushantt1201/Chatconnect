import mongoose from "mongoose";

const userSchema= new mongoose.Schema({


    Email:{
      type:String,
      required:true,
      unique:true,
    },

    fullName:{
     type:String,
     required:true,
     

    },

    Password:{
    type:String,
    required:true,
    minLength:6,

    },
    ProfilePic:{
     type:String,
     default:"",
    },
},{timestamps:true});

const User= mongoose.model("User",userSchema);

export  default User;