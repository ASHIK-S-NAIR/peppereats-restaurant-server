"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservation_1 = require("../controllers/reservation");
const reservation_2 = require("../middlewares/reservation");
const admin_1 = require("../middlewares/admin");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.param("adminId", admin_1.getAdminById);
router.param("reservationId", reservation_2.getReservationById);
router.post("/reservation/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, reservation_1.createReservation);
router.get("/reservation/:reservationId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, reservation_1.createReservation);
router.put("/reservation/:reservationId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, reservation_1.createReservation);
router.delete("/reservation/:reservationId/:adminId", auth_1.isSignedIn, auth_1.isAuthenticated, auth_1.isAdmin, reservation_1.createReservation);
module.exports = router;
//# sourceMappingURL=reservation.js.map