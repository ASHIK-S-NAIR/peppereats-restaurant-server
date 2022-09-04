"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const admin_1 = require("../middlewares/admin");
const auth_1 = require("../middlewares/auth");
const customer_2 = require("../middlewares/customer");
const validate_request_schema_1 = require("../middlewares/validate-request-schema");
const customerSchema_1 = require("../middlewares/validationSchema/customerSchema");
const router = express_1.default.Router();
router.param("customerId", customer_2.getCustomerById);
router.param("adminId", admin_1.getAdminById);
router.get("/customer/getallcustomers/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, customer_1.getAllCustomers);
router.get("/customer/getcustomer/:customerId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, customer_1.getCustomer);
router.put("/customer/updatecustomer/:customerId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, customerSchema_1.customerPutValidationSchema, validate_request_schema_1.validateRequestSchema, customer_1.updateCustomer);
router.delete("/customer/deletecustomer/:customerId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, customer_1.deleteCustomer);
module.exports = router;
//# sourceMappingURL=cutomer.js.map