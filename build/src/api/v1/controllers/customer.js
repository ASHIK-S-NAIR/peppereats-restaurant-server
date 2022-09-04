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
exports.getAllCustomers = exports.deleteCustomer = exports.updateCustomer = exports.getCustomer = void 0;
const Customer = require("../models/customer");
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(req.customer);
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get customer from database",
        });
    }
});
exports.getCustomer = getCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Customer.findByIdAndUpdate({ _id: req.customer._id }, { $set: req.body }, { new: true })
            .then((customer) => {
            return res.status(200).json({
                message: "Successfully updated the customer",
            });
        })
            .catch((error) => {
            return res.status(400).json({
                message: "Failed to update customer from database",
            });
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to update customer from database",
        });
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Customer.deleteOne({ _id: req.customer._id })
            .then((customer) => {
            return res.status(200).json({
                message: "Successfully deleted the customer",
            });
        })
            .catch((error) => {
            return res.status(400).json({
                message: "Failed to delete customer from database",
            });
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to delete customer from database",
        });
    }
});
exports.deleteCustomer = deleteCustomer;
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield Customer.find({});
        return res.status(200).json(customers);
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get all customers from database",
        });
    }
});
exports.getAllCustomers = getAllCustomers;
//# sourceMappingURL=customer.js.map