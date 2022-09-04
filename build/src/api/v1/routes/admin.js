"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const auth_1 = require("../middlewares/auth");
const admin_2 = require("../middlewares/admin");
const validate_request_schema_1 = require("../middlewares/validate-request-schema");
const adminSchema_1 = require("../middlewares/validationSchema/adminSchema");
const router = express_1.default.Router();
router.param("adminId", admin_2.getAdminById);
router.get("/admin/getadmin/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, admin_1.getAdmin);
router.put("/admin/updateadmin/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, adminSchema_1.adminPutValidationSchema, validate_request_schema_1.validateRequestSchema, admin_1.updateAdmin);
router.delete("/admin/deleteadmin/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, admin_1.deleteAdmin);
module.exports = router;
//# sourceMappingURL=admin.js.map