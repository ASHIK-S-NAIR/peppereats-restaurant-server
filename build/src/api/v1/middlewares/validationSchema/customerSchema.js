"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerPutValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.customerPutValidationSchema = [
    (0, express_validator_1.body)("customerFirstName")
        .optional()
        .isString()
        .withMessage("customerFirstName must be as string")
        .isLength({ max: 32 })
        .withMessage("customerFirstName legnth must be within 32"),
    (0, express_validator_1.body)("customerLastName")
        .optional()
        .isString()
        .withMessage("customerLastName must be as string")
        .isLength({ max: 32 })
        .withMessage("customerFirstName legnth must be within 32"),
    (0, express_validator_1.body)("customerEmail")
        .optional()
        .isEmail()
        .withMessage("valid email is needed"),
    (0, express_validator_1.body)("customerPhoneNumber")
        .optional()
        .isNumeric()
        .withMessage("customer Phone Number must be number")
        .isLength({ min: 10, max: 10 })
        .withMessage("customer phone number must be 10 digits"),
];
//# sourceMappingURL=customerSchema.js.map