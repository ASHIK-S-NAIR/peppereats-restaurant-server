"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_request_schema_1 = require("../middlewares/validate-request-schema");
const authSchema_1 = require("../middlewares/validationSchema/authSchema");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post("/adminsignup", authSchema_1.adminSignupValidationSchema, validate_request_schema_1.validateRequestSchema, auth_1.adminSignup);
router.post("/adminlogin", authSchema_1.adminLoginValidationSchema, validate_request_schema_1.validateRequestSchema, auth_1.adminLogin);
router.post("/customerloginotp", auth_1.customerLoginOtp);
router.post("/customerloginverify", auth_1.customerLoginVerify);
router.post("/customersignupotp", auth_1.customerSignupOtp);
router.post("/customersignupverify", auth_1.customerSignupVerify);
router.post("/logout", auth_1.logout);
module.exports = router;
//# sourceMappingURL=auth.js.map