import express, { NextFunction } from "express";
import { getAllReservationTables, getReservationTable } from "../controllers/reservationTable";
import { getAdminById } from "../middlewares/admin";
import { isAdmin, isAuthenticated, isSignedIn } from "../middlewares/auth";
import { getReservationTableById } from "../middlewares/reservationTable";
const router = express.Router();

router.param("adminId", getAdminById);
router.param("reservationTableId", getReservationTableById);

// const testMiddleware = (next: NextFunction) => {
//   console.log("reached at route");
//   next();
// };

router.get(
  "/reservationtable/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllReservationTables
);
router.get(
  "/reservationtable/:reservationTableId/:adminId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getReservationTable
);

module.exports = router;
