"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryPutValidationSchema = exports.categoryPostValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.categoryPostValidationSchema = [
    (0, express_validator_1.body)("categoryName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("categoryName is required")
        .isString()
        .withMessage("categoryName must be as string")
        .isLength({ max: 32 })
        .withMessage("categoryName legnth must be within 32"),
];
exports.categoryPutValidationSchema = [
    (0, express_validator_1.body)("categoryName")
        .optional()
        .isString()
        .withMessage("categoryName must be as string")
        .isLength({ max: 32 })
        .withMessage("categoryName legnth must be within 32"),
];
//# sourceMappingURL=categorySchema.js.map