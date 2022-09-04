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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.postCategory = void 0;
const Category = require("../models/category");
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryName = req.body.categoryName;
    try {
        const category = yield Category.create({
            categoryName: categoryName,
        });
        return res.status(200).json({
            category,
        });
    }
    catch (error) {
        console.log("Message", error.message);
        return res.status(400).json({
            message: "Failed to create category",
        });
    }
});
exports.postCategory = postCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.find({});
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(400).json({
            message: "Can't find categories",
        });
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(req.category);
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get category from database",
        });
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category.findByIdAndUpdate({ _id: req.category._id }, { $set: req.body }, { new: true });
        return res.status(200).json({
            message: "Successfully updated the category",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to update category from database",
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category.deleteOne({ _id: req.category._id });
        return res.status(200).json({
            message: "Successfully deleted the category",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to delete category from database",
        });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.js.map