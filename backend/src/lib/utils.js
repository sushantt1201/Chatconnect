import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("JWT", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,

    // IMPORTANT for Vercel (frontend) ↔ Render (backend)
    sameSite: "none",
    secure: true,
  });

  return token;
};


//http   means localhost
//https means production web