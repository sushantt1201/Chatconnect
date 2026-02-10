import User from "../modals/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import "dotenv/config";

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
        });

        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);

        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            Email: savedUser.Email,
            profilePic: savedUser.ProfilePic,
        });

        try {
            await sendWelcomeEmail(savedUser.Email, savedUser.fullName, process.env.CLIENT_URL);
        } catch (error) {
            console.log("failed to send welcome email");
        }

    } catch (error) {
        console.log("error in signupt controller", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};
