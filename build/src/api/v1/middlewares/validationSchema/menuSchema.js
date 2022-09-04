"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuPutmenuImageValidationSchema = exports.menuPutValidationSchema = exports.menuPostValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.menuPostValidationSchema = [
    (0, express_validator_1.body)("menuName")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("menuName is required")
        .isString()
        .withMessage("menuName must be a string")
        .isLength({ max: 32 })
        .withMessage("menuName legnth must be within 32"),
    (0, express_validator_1.body)("menuCategory")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("menuCategory is required")
        .isString()
        .withMessage("menuCategory must be a String"),
    (0, express_validator_1.body)("menuPrice")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("menuPrice is required")
        .isNumeric()
        .withMessage("menuPrice must be a Number"),
    (0, express_validator_1.body)("menuDescription")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("menuDescription is required")
        .isString()
        .withMessage("menuDescription must be a string")
        .isLength({ max: 500 })
        .withMessage("menuDescription legnth must be within 500"),
];
exports.menuPutValidationSchema = [
    (0, express_validator_1.body)("menuName")
        .optional()
        .isString()
        .withMessage("menuName must be a string")
        .isLength({ max: 32 })
        .withMessage("menuName legnth must be within 32"),
    (0, express_validator_1.body)("menuCategory")
        .optional()
        .isString()
        .withMessage("menuCategory must be a String"),
    (0, express_validator_1.body)("menuPrice")
        .optional()
        .isNumeric()
        .withMessage("menuPrice must be a Number"),
    (0, express_validator_1.body)("menuDescription")
        .optional()
        .isString()
        .withMessage("menuDescription must be a string")
        .isLength({ max: 500 })
        .withMessage("menuDescription legnth must be within 500"),
];
exports.menuPutmenuImageValidationSchema = [];
//# sourceMappingURL=menuSchema.js.map