import { Request, Response } from "express";
const Category = require("../models/category");

export const postCategory = async (
  req: Request<{}, {}, { categoryName: "string" }, {}>,
  res: Response
) => {
  const categoryName = req.body.categoryName;
  try {
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

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({
      message: "Can't find categories",
    });
  }
};

export const getCategory = async (req: Request, res:Response) => {
  try {
    return res.status(200).json(req.category);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get category from database",
    });
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndUpdate(
      { _id: req.category._id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      message: "Successfully updated the category",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update category from database",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.deleteOne({ _id: req.category._id });
    return res.status(200).json({
      message: "Successfully deleted the category",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to delete category from database",
    });
  }
};
