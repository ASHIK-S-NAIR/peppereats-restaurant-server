import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isSignedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = await jwt.verify(
        token,
        process.env.SECRET as string
      );

      req.user = await decodedToken;
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Auth failed",
      });
    }
  }
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checker = req.profile && req.user && req.user._id == req.profile._id;
    if (!checker) {
      return res.status(400).json({ message: "Authentication Failed" });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to authenticate user",
    });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.profile.role !== 1) {
      return res.status(404).json({
        message: "Not an admin Access denied",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Not adim",
    });
  }
};
