import jwt from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1]; // Bearer token

  // Token doesn't exist
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized request.");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?.userId).select(
    "-password -refreshToken"
  );

  // Invalid token
  if (!user) {
    res.status(401);
    throw new Error("Invalid Access Token");
  }

  req.user = user;
  next();
});

export default verifyJwt;
