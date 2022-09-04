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
exports.deleteMenu = exports.updateMenuImage = exports.updateMenu = exports.getMenu = exports.getMenuByCategory = exports.getAllMenu = exports.createMenu = void 0;
const Menu = require("../models/menu");
const Category = require("../models/category");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { menuName, menuCategory, menuPrice, menuDescription } = req.body;
        const category = yield Category.findById(menuCategory);
        if (!category) {
            return res.status(400).json({
                message: "Failed to find category",
            });
        }
        const menu = yield Menu.create({
            menuName,
            menuCategory,
            menuPrice,
            menuDescription,
        });
        yield menu.save();
        const file = req.file;
        const result = yield cloudinary.uploader.upload(file === null || file === void 0 ? void 0 : file.path, {
            folder: "peppereats/menu",
            public_id: `${menu.menuName}_${menu._id}`,
        });
        yield unlinkFile(file === null || file === void 0 ? void 0 : file.path);
        yield Menu.findByIdAndUpdate({ _id: menu._id }, {
            $set: {
                menuImage: { publicId: result.public_id, url: result.secure_url },
            },
        }, { new: true, useFindAndModify: false });
        res.status(200).json({ message: "upload Succesfull" });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to upload menu",
        });
    }
});
exports.createMenu = createMenu;
const getAllMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield Menu.find({});
        return res.status(200).json(menu);
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get menu",
        });
    }
});
exports.getAllMenu = getAllMenu;
const getMenuByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield Menu.find({ menuCategory: req.category._id });
        return res.status(200).json(menu);
    }
    catch (error) {
        console.log("error message", error.message);
        return res.status(400).json({
            message: "Failed to get menu by category",
        });
    }
});
exports.getMenuByCategory = getMenuByCategory;
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(req.menu);
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get menu from database",
        });
    }
});
exports.getMenu = getMenu;
const updateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Menu.findByIdAndUpdate({ _id: req.menu._id }, { $set: req.body }, { new: true });
        if (req.file) {
            let result = yield cloudinary.uploader.destroy(`${req.menu.menuName}_${req.menu._id}`, {
                folder: "peppereats/menu",
            });
            const file = req.file;
            result = yield cloudinary.uploader.upload(file === null || file === void 0 ? void 0 : file.path, {
                folder: "peppereats/menu",
                public_id: `${req.menu.menuName}_${req.menu._id}`,
            });
            yield unlinkFile(file === null || file === void 0 ? void 0 : file.path);
            yield Menu.findByIdAndUpdate({ _id: req.menu._id }, {
                $set: {
                    menuImage: { publicId: result.public_id, url: result.secure_url },
                },
            }, { new: true, useFindAndModify: false });
        }
        return res.status(200).json({
            message: "Successfully updated the menu",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to update menu from database",
        });
    }
});
exports.updateMenu = updateMenu;
const updateMenuImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield cloudinary.uploader.destroy(`${req.menu.menuName}_${req.menu._id}`, {
            folder: "peppereats/menu",
        });
        const file = req.file;
        result = yield cloudinary.uploader.upload(file === null || file === void 0 ? void 0 : file.path, {
            folder: "peppereats/menu",
            public_id: `${req.menu.menuName}_${req.menu._id}`,
        });
        yield unlinkFile(file === null || file === void 0 ? void 0 : file.path);
        yield Menu.findByIdAndUpdate({ _id: req.menu._id }, {
            $set: {
                menuImage: { publicId: result.public_id, url: result.secure_url },
            },
        }, { new: true, useFindAndModify: false });
        res.status(200).json({ message: "menuImge updated Succesfull" });
    }
    catch (error) {
        console.log("errorMessage", error.message);
        return res.status(400).json({
            message: "Failed to update menu Image from database",
        });
    }
});
exports.updateMenuImage = updateMenuImage;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Menu.deleteOne({ _id: req.menu._id });
        return res.status(200).json({
            message: "Successfully deleted the menu",
        });
    }
    catch (error) {
        console.log("error Message", error.message);
        return res.status(400).json({
            message: "Failed to delete menu from database",
        });
    }
});
exports.deleteMenu = deleteMenu;
//# sourceMappingURL=menu.js.map