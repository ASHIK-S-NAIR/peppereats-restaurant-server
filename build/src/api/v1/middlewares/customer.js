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
exports.getCustomerById = void 0;
const Customer = require("../models/customer");
const getCustomerById = (req, res, next, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield Customer.findById({ _id: id });
        req.customer = customer;
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to get customer by id",
        });
    }
});
exports.getCustomerById = getCustomerById;
//# sourceMappingURL=customer.js.map