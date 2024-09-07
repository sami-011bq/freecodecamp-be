import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  // Check required fields
  if ([name, email, password].some((value) => value?.trim() === "")) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // If email address is already registered
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(409);
    throw new Error("Email id already exists.");
  }

  // New user registration
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt); // password hashing
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatar,
  });

  if (user) {
    res.status(201).json({ message: "Successfully signed up! Please Login." });
  } else {
    res.status(500);
    throw new Error("Something went wrong while registering the user.");
  }
});

export { registerUser };
