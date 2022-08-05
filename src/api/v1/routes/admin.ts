import express from "express";
import { deleteAdmin, getAdmin, updateAdmin } from "../controllers/admin";
import { getAdminById } from "../middlewares/admin";
import { validateRequestSchema } from "../middlewares/validate-request-schema";
import { adminPutValidationSchema } from "../middlewares/validationSchema/adminSchema";
const router = express.Router();

router.param("adminId", getAdminById);

router.get("/admin/getadmin/:adminId", getAdmin);
router.put(
  "/admin/updateadmin/:adminId",
  adminPutValidationSchema,
  validateRequestSchema,
  updateAdmin
);
router.delete("/admin/deleteadmin/:adminId", deleteAdmin);

module.exports = router;
