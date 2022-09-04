"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPutValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.adminPutValidationSchema = [
    (0, express_validator_1.body)("adminFirstName")
        .optional()
        .isString()
        .withMessage("adminFirstName must be as string")
        .isLength({ max: 32 })
        .withMessage("adminFirstName legnth must be within 32"),
    (0, express_validator_1.body)("adminLastName")
        .optional()
        .isString()
        .withMessage("useradminName must be as string")
        .isLength({ max: 32 })
        .withMessage("userFadminName legnth must be within 32"),
    (0, express_validator_1.body)("adminEmail").optional().isEmail().withMessage("valid email is needed"),
    (0, express_validator_1.body)("adminPhoneNumber")
        .optional()
        .isNumeric()
        .withMessage("admin Phone Number must be number")
        .isLength({ min: 10, max: 10 })
        .withMessage("admin phone number must be 10 digits"),
];
//# sourceMappingURL=adminSchema.js.map