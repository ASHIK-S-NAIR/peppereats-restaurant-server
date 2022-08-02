import { body } from "express-validator";

export const menuPostValidationSchema = [
  body("menuName")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("menuName is required")
    .isString()
    .withMessage("menuName must be a string")
    .isLength({ max: 32 })
    .withMessage("menuName legnth must be within 32"),
  body("menuCategory")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("menuCategory is required")
    .isString()
    .withMessage("menuCategory must be a String"),
  body("menuPrice")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("menuPrice is required")
    .isNumeric()
    .withMessage("menuPrice must be a Number"),
  body("menuDescription")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("menuDescription is required")
    .isString()
    .withMessage("menuDescription must be a string")
    .isLength({ max: 500 })
    .withMessage("menuDescription legnth must be within 500")
];
