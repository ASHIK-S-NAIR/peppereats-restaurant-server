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
router.get("/customer/getcustomer/:customerId", getCustomer);
router.put(
  "/customer/updatecustomer/:customerId",
  customerPutValidationSchema,
  validateRequestSchema,
  updateCustomer
);
router.delete(
  "/customer/deletecustomer/:customerId",
  deleteCustomer
);


module.exports = router;
