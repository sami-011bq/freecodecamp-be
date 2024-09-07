import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRTY_TIME = 15 * 60; // 900 seconds (15 minutes)
const REFRESH_TOKEN_EXPIRTY_TIME = 7 * 24 * 60 * 60; // 604,800 seconds (7 days)

const generateAccessToken = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRTY_TIME,
  });

  // Set cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: ACCESS_TOKEN_EXPIRTY_TIME * 1000, // in milliseconds
  });

  return accessToken;
};

const generateRefreshToken = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRTY_TIME,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: REFRESH_TOKEN_EXPIRTY_TIME * 1000,
  });

  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
