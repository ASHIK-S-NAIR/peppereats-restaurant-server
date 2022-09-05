import express from "express";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import {
  adminLoginValidationSchema,
  adminSignupValidationSchema,
} from "../middlewares/validationSchema/authSchema";
import {
  adminLogin,
  adminSignup,
  customerLoginOtp,
  customerLoginVerify,
  customerSignupOtp,
  customerSignupVerify,
  logout,
} from "../controllers/auth";
const router = express.Router();

router.post(
  "/admin/signup",
  adminSignupValidationSchema,
  validateRequestSchema,
  adminSignup
);

router.post(
  "/admin/login",
  adminLoginValidationSchema,
  validateRequestSchema,
  adminLogin
);

router.post("/customer/loginotp", customerLoginOtp);

router.post("/customer/loginverify", customerLoginVerify);

router.post("/customer/signupotp", customerSignupOtp);

router.post("/customer/signupverify", customerSignupVerify);

router.post("/logout", logout);

module.exports = router;
