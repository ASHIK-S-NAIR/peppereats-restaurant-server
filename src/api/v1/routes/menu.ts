import express, { Request, Response } from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenu,
  getMenu,
  getMenuByCategory,
  updateMenu,
  updateMenuImage,
} from "../controllers/menu";
import { getCategoryById } from "../middlewares/category";
import { getMenuById } from "../middlewares/menu";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import {
  menuPostValidationSchema,
  menuPutmenuImageValidationSchema,
  menuPutValidationSchema,
} from "../middlewares/validationSchema/menuSchema";

const multer = require("multer");

var upload = multer({ dest: "uploads/" });

const router = express.Router();

router.param("menuId", getMenuById);
router.param("categoryId", getCategoryById);

router.post(
  "/menu/createmenu",
  upload.single("menuImage"),
  menuPostValidationSchema,
  validateRequestSchema,
  createMenu
);
router.get("/menu/getallmenu", getAllMenu);
router.get("/menu/getmenubycategory/:categoryId", getMenuByCategory);
router.get("/menu/getmenu/:menuId", getMenu);
router.put(
  "/menu/updatemenu/:menuId",
  menuPutValidationSchema,
  validateRequestSchema,
  updateMenu
);
router.put(
  "/menu/updatemenuimage/:menuId",
  menuPutmenuImageValidationSchema,
  validateRequestSchema,
  upload.single("menuImage"),
  updateMenuImage
);
router.delete("/menu/deletemenu/:menuId", deleteMenu);

module.exports = router;
