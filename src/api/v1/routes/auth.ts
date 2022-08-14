import express from "express";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import {
  adminLoginValidationSchema,
  adminSignupValidationSchema,
} from "../middlewares/validationSchema/authSchema";
import {
  adminLogin,
  adminSignup,
  customerLogin,
  customerSignupOtp,
  customerSignupVerify,
  logout,
} from "../controllers/auth";
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

router.post("/customerlogin", customerLogin);

router.post("/customersignupotp", customerSignupOtp);

router.post("/customersignupverify", customerSignupVerify);

router.post("/logout", logout);

module.exports = router;
