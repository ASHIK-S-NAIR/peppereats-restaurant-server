"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = void 0;
const Category = require("../models/category");
const getCategoryById = (req, res, next, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findById({ _id: id });
        req.category = category;
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get category by id",
        });
    }
});
exports.getCategoryById = getCategoryById;
//# sourceMappingURL=category.js.map