"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const menu_1 = require("../controllers/menu");
const category_1 = require("../middlewares/category");
const menu_2 = require("../middlewares/menu");
const validate_request_schema_1 = require("../middlewares/validate-request-schema");
const menuSchema_1 = require("../middlewares/validationSchema/menuSchema");
const admin_1 = require("../middlewares/admin");
const multer = require("multer");
var upload = multer({ dest: "uploads/" });
const router = express_1.default.Router();
router.param("menuId", menu_2.getMenuById);
router.param("categoryId", category_1.getCategoryById);
router.param("adminId", admin_1.getAdminById);
router.post("/menu/createmenu/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, upload.single("menuImage"), menuSchema_1.menuPostValidationSchema, validate_request_schema_1.validateRequestSchema, menu_1.createMenu);
router.get("/menu/getallmenu", menu_1.getAllMenu);
router.get("/menu/getmenubycategory/:categoryId", menu_1.getMenuByCategory);
router.get("/menu/getmenu/:menuId", menu_1.getMenu);
router.put("/menu/updatemenu/:menuId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, menuSchema_1.menuPutValidationSchema, validate_request_schema_1.validateRequestSchema, upload.single("menuImage"), menu_1.updateMenu);
router.put("/menu/updatemenuimage/:menuId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, menuSchema_1.menuPutmenuImageValidationSchema, validate_request_schema_1.validateRequestSchema, upload.single("menuImage"), menu_1.updateMenuImage);
router.delete("/menu/deletemenu/:menuId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, menu_1.deleteMenu);
module.exports = router;
//# sourceMappingURL=menu.js.map