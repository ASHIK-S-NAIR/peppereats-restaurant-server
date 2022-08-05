import { body } from "express-validator";

export const adminPutValidationSchema = [
  body("adminFirstName")
    .optional()
    .isString()
    .withMessage("adminFirstName must be as string")
    .isLength({ max: 32 })
    .withMessage("adminFirstName legnth must be within 32"),
  body("adminLastName")
    .optional()
    .isString()
    .withMessage("useradminName must be as string")
    .isLength({ max: 32 })
    .withMessage("userFadminName legnth must be within 32"),
  body("adminEmail").optional().isEmail().withMessage("valid email is needed"),
  body("adminPhoneNumber")
    .optional()
    .isNumeric()
    .withMessage("admin Phone Number must be number")
    .isLength({ min: 10, max: 10 })
    .withMessage("admin phone number must be 10 digits"),
];
