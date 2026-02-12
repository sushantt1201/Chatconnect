import User from "../modals/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import "dotenv/config";
import cloudinary from "../lib/cloudinary.js";

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
            ProfilePic: savedUser.ProfilePic,
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

export const login = async (req, res) => {
    const { Email, Password } = req.body;

  if(!Email || ! Password){
    return res.status(400).json({message:"both email and password required"});
  }

    try {
        const user = await User.findOne({ Email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            Email: user.Email,
            ProfilePic: user.ProfilePic,
        });

    } catch (error) {
        console.error("Error in login controllers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out sucessfully" });
};



export const updateProfile = async (req, res) => {
  try {
    const { ProfilePic } = req.body;

    if (!ProfilePic) {
      return res.status(400).json({ message: "Profile pic is required:" });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(ProfilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ProfilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);

  } catch (error) {
    console.log("error in updating profile", error);
    res.status(500).json({ message: "internal server error" });
  }
};

