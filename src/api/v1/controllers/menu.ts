import { Request, Response, NextFunction } from "express";
const Menu = require("../models/menu");

export const createMenu = async (req: Request, res: Response) => {
  const { menuName, menuCategory, menuPrice, menuDescription } = req.body;

  const menu = await Menu.create({
    menuName,
    menuCategory,
    menuPrice,
    menuDescription,
  });
  await menu.save();

    // const file = req.file;
};
