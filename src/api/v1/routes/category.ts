import express from "express";
const router = express.Router();

const { getCategories, postCategory } = require("../controllers/category");

router.get("/category", getCategories);
router.post("/category", postCategory);

export = router;
