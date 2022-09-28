import express from "express";
import { createReservation, getReservation } from "../controllers/reservation";
import {getReservationById} from "../middlewares/reservation";
import { getAdminById } from "../middlewares/admin";
import { isAdmin, isAuthenticated, isSignedIn } from "../middlewares/auth";
const router = express.Router();

router.param("adminId", getAdminById);
router.param("reservationId", getReservationById);

router.post("/reservation/:adminId", isSignedIn, isAuthenticated, isAdmin, createReservation);
router.get("/reservation/:reservationId", getReservation);
router.put("/reservation/:reservationId/:adminId", isSignedIn, isAuthenticated, isAdmin, createReservation);
router.delete("/reservation/:reservationId/:adminId", isSignedIn, isAuthenticated, isAdmin, createReservation);

module.exports = router;