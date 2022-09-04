"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
const category_1 = require("../controllers/category");
const category_2 = require("../middlewares/category");
const validate_request_schema_1 = require("../middlewares/validate-request-schema");
const categorySchema_1 = require("../middlewares/validationSchema/categorySchema");
const admin_1 = require("../middlewares/admin");
const { getCategories, postCategory } = require("../controllers/category");
router.param("categoryId", category_2.getCategoryById);
router.param("adminId", admin_1.getAdminById);
router.post("/category/createcategory/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, categorySchema_1.categoryPostValidationSchema, validate_request_schema_1.validateRequestSchema, postCategory);
router.get("/category/getallcategory", getCategories);
router.get("/category/getCategory/:categoryId", category_1.getCategory);
router.put("/category/updatecategory/:categoryId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, categorySchema_1.categoryPutValidationSchema, validate_request_schema_1.validateRequestSchema, category_1.updateCategory);
router.delete("/category/deletecategory/:categoryId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, category_1.deleteCategory);
module.exports = router;
//# sourceMappingURL=category.js.map