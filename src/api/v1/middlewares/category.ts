import { Request, Response, NextFunction, Router } from "express";
const Category = require("../models/category");

export const getCategoryById = async (req: Request, res:Response, next: NextFunction, id: Router) => {
    try {
        const category = await Category.findById({_id: id});
        req.category = category;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Failed to get category by id",
          });
    }
}