import express, { NextFunction } from "express";
import {
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from "../controllers/customer";
import { getAdminById } from "../middlewares/admin";
import { isAdmin, isAuthenticated, isSignedIn } from "../middlewares/auth";
import { getCustomerById } from "../middlewares/customer";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { customerPutValidationSchema } from "../middlewares/validationSchema/customerSchema";

const router = express.Router();

router.param("customerId", getCustomerById);
router.param("adminId", getAdminById);

router.get(
  "/customer/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllCustomers
);
router.get(
  "/customer/:customerId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getCustomer
);
router.put(
  "/customer/:customerId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  customerPutValidationSchema,
  validateRequestSchema,
  updateCustomer
);
router.delete(
  "/customer/:customerId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCustomer
);

module.exports = router;
