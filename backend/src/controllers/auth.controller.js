import User from "../modals/User.js";

import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";  // adjust path if needed



export const signup = async (req, res) => {
    const { fullName, Email, Password } = req.body;


    try {
        if (!fullName || !Email || !Password) {

            return res.status(400).json({ message: "All fields are required" });
        }

        if (Password.length < 6) {

            return res.status(400).json({ message: "Password size must be greater than 6" });

        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({ message: "invalid mail" });
        }

        const user = await User.findOne({ Email });
        if (user) return res.status(400).json({ message: "User already exists" });



        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(Password, salt);
        const newUser = new User({

            fullName,
            Email,
            Password: hashPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                Email: newUser.Email,
                profilePic: newUser.ProfilePic,
            });


        }

        //to do send a welcome:) email to user
        else {
            res.status(400).json({ message: "invalid user details" });
        }


    } catch (error) {

        console.log("error in signupt controller",error);
        res.status(500).json({message:"Internal Server error"});

    }
};