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
exports.deleteAdmin = exports.updateAdmin = exports.getAdmin = void 0;
const Admin = require("../models/admin");
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(req.profile);
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get admin from database",
        });
    }
});
exports.getAdmin = getAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Admin.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true });
        return res.status(200).json({
            message: "Successfully updated the admin",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to update admin from database",
        });
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Admin.deleteOne({ _id: req.profile._id });
        return res.status(200).json({
            message: "Successfully deleted the admin",
        });
    }
    catch (error) {
        console.log("error Message", error.message);
        return res.status(400).json({
            message: "Failed to delete admin from database",
        });
    }
});
exports.deleteAdmin = deleteAdmin;
//# sourceMappingURL=admin.js.map