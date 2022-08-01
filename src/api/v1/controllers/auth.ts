import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
const Admin = require("../models/admin");

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const {
      userFirstName,
      userLastName,
      userPhoneNumber,
      userEmail,
      userPassword,
    } = req.body;
    const admin = await Admin.create({
      adminFirstName: userFirstName,
      adminLastName: userLastName,
      adminPhoneNumber: userPhoneNumber,
      adminEmail: userEmail,
      password: userPassword,
    });
    await admin.save();
    admin.adminEncry_password = undefined;
    admin.salt = undefined;
    admin.createdAt = undefined;
    admin.updatedAt = undefined;
    return res.json(admin);
  } catch (error: any) {
    return res.status(400).json({
      message: "Failed to adminSignup",
    });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { userPhoneNumber, userPassword } = req.body;
    const admin = await Admin.findOne({ adminPhoneNumber: userPhoneNumber });

    if (!admin) {
      return res
        .status(400)
        .json({ error: " Invalid phonenumber or password" });
    }

    if (admin.authenticate(userPassword)) {
      const token = jwt.sign({ _id: admin._id }, "pepperEatsSecret");
      res.cookie("token", token, {
        expires: new Date(Date.now() + 999),
        httpOnly: true,
      });

      const {
        _id,
        adminFirstName,
        adminLastName,
        adminPhoneNumber,
        adminEmail,
      } = admin;

      return res.status(200).json({
        token,
        admin: {
          _id,
          adminFirstName,
          adminLastName,
          adminPhoneNumber,
          adminEmail,
        },
      });
    }

    return res.status(400).json({ error: " Invalid phonenumber or password" });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to login Admin",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout Successfull",
  });
};
