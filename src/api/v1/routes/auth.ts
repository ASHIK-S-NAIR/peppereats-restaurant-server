import express, { Request, Response } from "express";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { signupValidationSchema } from "../validationSchema/authSchema";
const router = express.Router();
const { adminSignup } = require("../controllers/auth");

router.post("/adminsignup", signupValidationSchema, validateRequestSchema, adminSignup);

export = router;
