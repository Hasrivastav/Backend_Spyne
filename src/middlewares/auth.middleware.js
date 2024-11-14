
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt  from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
       
       if (!token) {
          throw new ApiError(401, "Unauthorized request: No token provided.");
       }
       
       // Decode the token without verifying (useful for debugging)
       const decodedToken = jwt.decode(token);
       console.log("Decoded token:", decodedToken);
 
       // Verify the token with the secret
       const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       console.log("Verified token:", verifiedToken);
 
       const user = await User.findById(verifiedToken?._id).select("-password -refreshToken");
 
       if (!user) {
          throw new ApiError(401, "Invalid access token");
       }
 
       req.user = user;
       next();
    } catch (error) {
       if (error instanceof jwt.TokenExpiredError) {
          throw new ApiError(401, "Token has expired");
       } else if (error instanceof jwt.JsonWebTokenError) {
          throw new ApiError(401, "Invalid token");
       }
       throw new ApiError(401, error?.message || "Invalid access token");
    }
 });
 