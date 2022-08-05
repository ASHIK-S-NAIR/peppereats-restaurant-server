import express from "express";
import {
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../controllers/customer";
import { getCustomerById } from "../middlewares/customer";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { customerPutValidationSchema } from "../middlewares/validationSchema/customerSchema";

const router = express.Router();

router.param("customerId", getCustomerById);

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
