import express, { Request, Response } from "express";
import { isAdmin, isAuthenticated, isSignedIn } from "../middlewares/auth";
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
import { getAdminById } from "../middlewares/admin";

const multer = require("multer");

var upload = multer({ dest: "uploads/" });

const router = express.Router();

router.param("menuId", getMenuById);
router.param("categoryId", getCategoryById);
router.param("adminId", getAdminById)

router.post(
  "/menu/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.single("menuImage"),
  menuPostValidationSchema,
  validateRequestSchema,
  createMenu
);
router.get("/menu", getAllMenu);
router.get("/menu/:categoryId", getMenuByCategory);
router.get("/menu/:menuId", getMenu);
router.put(
  "/menu/:menuId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  menuPutValidationSchema,
  validateRequestSchema,
  upload.single("menuImage"),
  updateMenu
);
router.put(
  "/menu/:menuId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  menuPutmenuImageValidationSchema,
  validateRequestSchema,
  upload.single("menuImage"),
  updateMenuImage
);
router.delete(
  "/menu/:menuId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteMenu
);

module.exports = router;
