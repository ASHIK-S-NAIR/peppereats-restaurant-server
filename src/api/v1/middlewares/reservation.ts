import { Request, Response, NextFunction, Router } from "express";
const Reservation = require("../models/reservation");

export const getReservationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: Router
) => {
  try {
    const reservation = await Reservation.findById({ _id: id });
    req.reservation = reservation;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get reservation by id",
    });
  }
};
