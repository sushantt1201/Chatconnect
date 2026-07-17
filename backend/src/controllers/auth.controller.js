import bcrypt from "bcryptjs";
import "dotenv/config";
import cloudinary from "../lib/cloudinary.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const normalizeName = (value) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

export const signup = async (req, res) => {
  try {
    // Accept both the project's existing capitalized names and
    // conventional lowercase names.
    const fullName = normalizeName(req.body.fullName);
    const Email = normalizeEmail(req.body.Email ?? req.body.email);
    const Password = req.body.Password ?? req.body.password ?? "";

    if (!fullName || !Email || !Password) {
      return res.status(400).json({
        message: "Full name, email, and password are required.",
      });
    }

    if (fullName.length < 2 || fullName.length > 60) {
      return res.status(400).json({
        message: "Full name must contain between 2 and 60 characters.",
      });
    }

    if (typeof Password !== "string" || Password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters.",
      });
    }

    if (Password.length > 128) {
      return res.status(400).json({
        message: "Password is too long.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        message: "Enter a valid email address.",
      });
    }

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const PasswordHash = await bcrypt.hash(Password, 10);

    const savedUser = await User.create({
      fullName,
      Email,
      Password: PasswordHash,
    });

    generateToken(savedUser._id, res);

    res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      Email: savedUser.Email,
      ProfilePic: savedUser.ProfilePic,
    });

    // Never allow email-service failure to undo account creation.
    void sendWelcomeEmail(
      savedUser.Email,
      savedUser.fullName,
      process.env.CLIENT_URL,
    ).catch((error) => {
      console.error("Welcome email failed:", error.message);
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    if (error?.name === "ValidationError") {
      const firstMessage = Object.values(error.errors ?? {})[0]?.message;

      return res.status(400).json({
        message: firstMessage || "Invalid account details.",
      });
    }

    console.error("Error in signup controller:", error);
    return res.status(500).json({
      message: "Unable to create your account right now.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const Email = normalizeEmail(req.body.Email ?? req.body.email);
    const Password = req.body.Password ?? req.body.password ?? "";

    if (!Email || !Password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      Password,
      user.Password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      Email: user.Email,
      ProfilePic: user.ProfilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({
      message: "Unable to sign in right now.",
    });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    message: "Logged out successfully.",
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { ProfilePic } = req.body;

    if (!ProfilePic) {
      return res.status(400).json({
        message: "Profile picture is required.",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(ProfilePic, {
      upload_preset: "profile_preset",
      resource_type: "image",
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ProfilePic: uploadResponse.secure_url },
      { new: true },
    ).select("-Password");

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Unable to update profile.",
    });
  }
};
