"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginValidationSchema = exports.adminSignupValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.adminSignupValidationSchema = [
    (0, express_validator_1.body)("userFirstName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("userFirstName is required")
        .isString()
        .withMessage("userFirstName must be as string")
        .isLength({ max: 32 })
        .withMessage("userFirstName legnth must be within 32"),
    (0, express_validator_1.body)("userLastName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("userLastName is required")
        .isString()
        .withMessage("userLastName must be as string")
        .isLength({ max: 32 })
        .withMessage("userFirstName legnth must be within 32"),
    (0, express_validator_1.body)("userEmail")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Email is required")
        .isEmail()
        .withMessage("valid email is needed"),
    (0, express_validator_1.body)("userPhoneNumber")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("user Phone Number is required")
        .isNumeric()
        .withMessage("user Phone Number must be number")
        .isLength({ min: 10, max: 10 })
        .withMessage("user phone number must be 10 digits"),
    (0, express_validator_1.body)("userPassword")
        .isLength({ min: 6 })
        .withMessage("password must be atleat 6 characters"),
];
exports.adminLoginValidationSchema = [
    (0, express_validator_1.body)("userEmail")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("user Email is required")
        .isString()
        .withMessage("user Email must be string"),
    (0, express_validator_1.body)("userPassword")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("user password is required"),
];
//# sourceMappingURL=authSchema.js.map