import { Request, Response, NextFunction } from "express";
const Category = require("../models/category");

exports.getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({
      message: "Can't find categories",
    });
  }
};

exports.postCategory = async (req: Request, res: Response) => {
  const categoryName = req.body.categoryName;
  try {
    console.log("Post works");
    const category = await Category.create({
      categoryName: categoryName,
    });

    return res.status(200).json({
      category,
    });
  } catch (error: any) {
    console.log("Message", error.message);
    return res.status(400).json({
      message: "Failed to create category",
    });
  }
};
