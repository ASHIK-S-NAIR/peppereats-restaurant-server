import { body } from "express-validator";

export const categoryPostValidationSchema = [
  body("categoryName")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("categoryName is required")
    .isString()
    .withMessage("categoryName must be as string")
    .isLength({ max: 32 })
    .withMessage("categoryName legnth must be within 32"),
];
