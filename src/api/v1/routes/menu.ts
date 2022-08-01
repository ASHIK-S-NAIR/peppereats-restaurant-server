import express from "express";
import { createMenu } from "../controllers/menu";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
const multer = require('multer');

var upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/menu", upload.single("menuImage"), createMenu);

export = router;