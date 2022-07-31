import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const Admin = require("../models/admin");

exports.adminSignup = async (req: Request, res: Response) => {

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
    console.log("error message", error.message);
    return res.status(400).json({
      message: "Failed to adminSignup",
    });
  }
};
