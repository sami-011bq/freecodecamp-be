import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRTY_TIME = 60 * 60; // 3600 seconds (1 hour)
const REFRESH_TOKEN_EXPIRTY_TIME = 7 * 24 * 60 * 60; // 604,800 seconds (7 days)

const generateAccessToken = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRTY_TIME,
  });

  return {
    accessToken,
    accessTokenExpiry: ACCESS_TOKEN_EXPIRTY_TIME * 1000, // in milliseconds, will be use by frontend to set cookie expiry time
  };
};

const generateRefreshToken = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRTY_TIME,
  });

  return {
    refreshToken,
    refreshTokenExpiry: REFRESH_TOKEN_EXPIRTY_TIME * 2000,
  };
};

export { generateAccessToken, generateRefreshToken };
