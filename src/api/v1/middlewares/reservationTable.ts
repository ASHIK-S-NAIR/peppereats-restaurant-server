import { Request, Response, NextFunction, Router } from "express";
const ReservationTable = require("../models/reservationTable");

export const getReservationTableById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: Router
) => {
  try {
    const reservationTable = await ReservationTable.findById({ _id: id });
    req.reservationTable = reservationTable;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get reservation by id",
    });
  }
};
