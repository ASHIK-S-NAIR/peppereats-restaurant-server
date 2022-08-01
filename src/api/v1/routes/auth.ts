import express from "express";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import {
  adminLoginValidationSchema,
  adminSignupValidationSchema,
} from "../validationSchema/authSchema";
import { adminLogin, adminSignup, logout } from "../controllers/auth";
const router = express.Router();

router.post(
  "/adminsignup",
  adminSignupValidationSchema,
  validateRequestSchema,
  adminSignup
);

router.post(
  "/adminlogin",
  adminLoginValidationSchema,
  validateRequestSchema,
  adminLogin
);

router.post("/logout", logout);

export = router;
