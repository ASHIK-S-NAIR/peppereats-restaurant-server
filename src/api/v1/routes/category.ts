import express from "express";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { categoryPostValidationSchema } from "../validationSchema/categorySchema";
const router = express.Router();

const { getCategories, postCategory } = require("../controllers/category");

router.get("/category", getCategories);
router.post(
  "/category",
  categoryPostValidationSchema,
  validateRequestSchema,
  postCategory
);

module.exports = router;
