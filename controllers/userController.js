import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

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

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password.trim()) {
    res.status(400);
    throw new Error("Email and password are required.");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(400);
    throw new Error("Invalid password.");
  }

  const accessToken = generateAccessToken(res, user.id);
  const refreshToken = generateRefreshToken(res, user.id);
  user.refreshToken = refreshToken;
  await user.save(); // Save refresh token in db

  // Response data
  res.status(200).json({
    name: user.name,
    email: user.email,
    accessToken,
    refreshToken,
    message: "User logged In Successfully",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  // Refresh token doesn't exist
  if (!refreshToken) {
    res.status(401);
    throw new Error("Unauthorized request.");
  }

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?.userId);

  // Invalid refresh token
  if (!user) {
    res.status(401);
    throw new Error("Invalid refresh token.");
  }

  // Refresh token doesn't match with user refresh token
  if (refreshToken !== user?.refreshToken) {
    res.status(401);
    throw new Error("Refresh token is expired or used.");
  }

  // Generate new access token
  const accessToken = generateAccessToken(res, user.id);
  res.status(200).json({
    message: "Access token refreshed.",
    accessToken,
  });
});

export { registerUser, loginUser, refreshAccessToken };
