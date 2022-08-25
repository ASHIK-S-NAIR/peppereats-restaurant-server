import express from "express";
import { isAdmin, isAuthenticated, isSignedIn } from "../middlewares/auth";
const router = express.Router();
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/category";
import { getCategoryById } from "../middlewares/category";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import {
  categoryPostValidationSchema,
  categoryPutValidationSchema,
} from "../middlewares/validationSchema/categorySchema";
import { getAdminById } from "../middlewares/admin";
const { getCategories, postCategory } = require("../controllers/category");

router.param("categoryId", getCategoryById);
router.param("adminId", getAdminById);

router.post(
  "/category/createcategory/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  categoryPostValidationSchema,
  validateRequestSchema,
  postCategory
);
router.get("/category/getallcategory", getCategories);
router.get("/category/getCategory/:categoryId", getCategory);
router.put(
  "/category/updatecategory/:categoryId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  categoryPutValidationSchema,
  validateRequestSchema,
  updateCategory
);
router.delete(
  "/category/deletecategory/:categoryId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
