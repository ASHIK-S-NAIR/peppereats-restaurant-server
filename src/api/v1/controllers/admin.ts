import { Request, Response } from "express";
const Admin = require("../models/admin");

export const getAdmin = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(req.profile);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get admin from database",
    });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    await Admin.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      message: "Successfully updated the admin",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update admin from database",
    });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    await Admin.deleteOne({ _id: req.profile._id });
    return res.status(200).json({
      message: "Successfully deleted the admin",
    });
  } catch (error: any) {
    console.log("error Message", error.message);
    return res.status(400).json({
      message: "Failed to delete admin from database",
    });
  }
};
