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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = exports.isSignedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isSignedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = yield jsonwebtoken_1.default.verify(token, process.env.SECRET);
            req.user = yield decodedToken;
            next();
        }
        catch (error) {
            return res.status(400).json({
                message: "Auth failed",
            });
        }
    }
});
exports.isSignedIn = isSignedIn;
const isAuthenticated = (req, res, next) => {
    try {
        const checker = req.profile && req.user && req.user._id == req.profile._id;
        if (!checker) {
            return res.status(400).json({ message: "Authentication Failed" });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to authenticate user",
        });
    }
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    try {
        if (req.profile.role !== 1) {
            return res.status(404).json({
                message: "Not an admin Access denied",
            });
        }
        next();
    }
    catch (error) {
        return res.status(400).json({
            message: "Not adim",
        });
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map