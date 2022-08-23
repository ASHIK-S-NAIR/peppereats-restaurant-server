import { Request, Response, NextFunction, Router } from "express";
const Menu = require("../models/menu");

export const getMenuById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: Router
) => {
  try {
    const menu = await Menu.findById({ _id: id });
    req.menu = menu;
    next();
  } catch (error: any) {
    console.log("error message", error.message);
    return res.status(400).json({
      message: "Failed to menu by id",
    });
  }
};
