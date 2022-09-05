import express from "express";
import { deleteAdmin, getAdmin, updateAdmin } from "../controllers/admin";
import { isAdmin, isAuthenticated, isSignedIn } from "../middlewares/auth";
import { getAdminById } from "../middlewares/admin";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { adminPutValidationSchema } from "../middlewares/validationSchema/adminSchema";
const router = express.Router();

router.param("adminId", getAdminById);

router.get(
  "/admin/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAdmin
);
router.put(
  "/admin/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  adminPutValidationSchema,
  validateRequestSchema,
  updateAdmin
);
router.delete(
  "/admin/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteAdmin
);

module.exports = router;
