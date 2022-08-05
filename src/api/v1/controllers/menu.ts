import { Request, Response, NextFunction } from "express";
const Menu = require("../models/menu");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

export const createMenu = async (
  req: Request<
    {},
    {},
    {
      menuName: "string";
      menuCategory: "number";
      menuPrice: "number";
      menuDescription: "string";
    },
    {}
  >,
  res: Response
) => {
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
    await unlinkFile(file?.path);

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
    const menu = await Menu.find({ menuCategory: req.category._id });
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
    return res.status(200).json(req.menu);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get menu from database",
    });
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    await Menu.findByIdAndUpdate(
      { _id: req.menu._id },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      message: "Successfully updated the menu",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update menu from database",
    });
  }
};

export const updateMenuImage = async (req: Request, res: Response) => {
  console.log("remenu", req.menu);
  try {
    let result = await cloudinary.uploader.destroy(
      `${req.menu.menuName}_${req.menu._id}`,
      {
        folder: "peppereats/menu",
      }
    );

    const file = req.file;
    result = await cloudinary.uploader.upload(file?.path, {
      folder: "peppereats/menu",
      public_id: `${req.menu.menuName}_${req.menu._id}`,
    });

    await unlinkFile(file?.path);

    await Menu.findByIdAndUpdate(
      { _id: req.menu._id },
      {
        $set: {
          menuImage: { publicId: result.public_id, url: result.secure_url },
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ message: "menuImge updated Succesfull" });
  } catch (error: any) {
    console.log("errorMessage", error.message)
    return res.status(400).json({
      message: "Failed to update menu Image from database",
    });
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    await Menu.deleteOne({ _id: req.menu._id });
    return res.status(200).json({
      message: "Successfully deleted the menu",
    });
  } catch (error: any) {
    console.log("error Message", error.message);
    return res.status(400).json({
      message: "Failed to delete menu from database",
    });
  }
};
