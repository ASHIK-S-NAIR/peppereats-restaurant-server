import {Request, Response, NextFunction} from 'express';
import Category = require("../models/category");

exports.getCategories = (req: Request, res:Response) => {
    console.log("All category will be loaded");
    return res.status(200).json({
        message: "Categories nailed it"
    })
}

exports.postCategory = (req: Request, res: Response) => {
    console.log("Post works")

    // Category.create({categoryName: req.body.categoryName})
    return res.status(200).json({
        message: "postCategory working"
    })
}