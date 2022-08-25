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
  "/customer/getallcustomers/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllCustomers
);
router.get(
  "/customer/getcustomer/:customerId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getCustomer
);
router.put(
  "/customer/updatecustomer/:customerId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  customerPutValidationSchema,
  validateRequestSchema,
  updateCustomer
);
router.delete(
  "/customer/deletecustomer/:customerId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCustomer
);

module.exports = router;
