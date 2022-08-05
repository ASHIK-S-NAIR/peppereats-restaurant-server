import { body } from "express-validator";

export const customerPutValidationSchema = [
  body("customerFirstName")
    .optional()
    .isString()
    .withMessage("customerFirstName must be as string")
    .isLength({ max: 32 })
    .withMessage("customerFirstName legnth must be within 32"),
  body("customerLastName")
    .optional()
    .isString()
    .withMessage("customerLastName must be as string")
    .isLength({ max: 32 })
    .withMessage("customerFirstName legnth must be within 32"),
  body("customerEmail")
    .optional()
    .isEmail()
    .withMessage("valid email is needed"),
  body("customerPhoneNumber")
    .optional()
    .isNumeric()
    .withMessage("customer Phone Number must be number")
    .isLength({ min: 10, max: 10 })
    .withMessage("customer phone number must be 10 digits"),
];
