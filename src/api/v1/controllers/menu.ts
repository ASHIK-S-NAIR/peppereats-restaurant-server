import { Request, Response, NextFunction } from "express";
const Menu = require("../models/menu");
const cloudinary = require("../utils/cloudinary");

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { menuName, menuCategory, menuPrice, menuDescription } = req.body;

    const menu = await Menu.create({
      menuName,
      menuCategory,
      menuPrice,
      menuDescription,
    });
    await menu.save();

    const file = req.file;
    console.log("file", file);
    console.log("menu", menu._id);

    const result = await cloudinary.uploader.upload(file?.path, {
      folder: "peppereats/menu",
      public_id: `${menu.menuName}_${menu._id}`,
    });
    console.log("result", result);

    await Menu.findByIdAndUpdate(
      { _id: menu._id },
      {
        $set: {
          menuImage: { publicId: result.public_id, url: result.secure_url },
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ message: "upload Succesfull" });
  } catch (error: any) {
    console.log("error message", error.message);
    return res.status(400).json({
      message: "Failed to upload menu",
    });
  }
};

export const getAllMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.find({});
    return res.status(200).json(menu);
  } catch (error: any) {
    console.log("error message", error.message);
    return res.status(400).json({
      message: "Failed to get menu",
    });
  }
};

export const getMenuByCategory = async (req: Request, res: Response) => {
  try {
    const {menucategory} = req.params;
    const menu = await Menu.find({ menuCategory: menucategory });
    return res.status(200).json(menu);
  } catch (error: any) {
    console.log("error message", error.message);
    return res.status(400).json({
      message: "Failed to get menu by category",
    });
  }
};

export const getMenu = async (req: Request, res: Response) => {
  try {
    // res.status(200).json(req.menu)
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get menu from database",
    });
  }
}
