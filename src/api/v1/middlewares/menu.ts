import { Request, Response, NextFunction, RequestParamHandler } from "express";
const Menu = require("../models/menu");

interface Imenu extends Request {
  menu: object;
}

export const getMenuById = async (
  req: Request<{},{},{},{}>,
  res: Response,
  next: NextFunction,
  id: any
) => {
  try {
    const menu = await Menu.findById({ _id: id });
    req.menu = menu;
    console.log("menu", menu);
    console.log("reqMenu", req.menu);
    // res.send("all good");
    next();
  } catch (error: any) {
    console.log("error message", error.message);
    return res.status(400).json({
      message: "Failed to menu by id",
    });
  }
};
