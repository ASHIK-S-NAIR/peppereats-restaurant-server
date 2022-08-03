import express,{Request} from "express";
import { createMenu, getAllMenu, getMenu, getMenuByCategory } from "../controllers/menu";
import { getMenuById } from "../middlewares/menu";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { menuPostValidationSchema } from "../validationSchema/menuSchema";

const multer = require("multer");

var upload = multer({ dest: "uploads/" });

const router = express.Router();

router.param("menuId", getMenuById);

router.post(
  "/menu",
  upload.single("menuImage"),
  menuPostValidationSchema,
  validateRequestSchema,
  createMenu
);
router.get("/allmenu", getAllMenu);
router.get("/menubycategory/:categoryId", getMenuByCategory);
router.get("/menu/getmenu/:menuId", getMenu);

module.exports = router;
