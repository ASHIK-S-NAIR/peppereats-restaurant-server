import { Request, Response } from "express";
const Reservation = require("../models/reservation");

export const createReservation = async (
  req: Request<
    {},
    {},
    {
      reservationCustomer: "string";
      reservationTable: "string";
      reservationTime: "string";
      reservationOrder: "array";
    },
    {}
  >,
  res: Response
) => {
  {
    const {
      reservationCustomer,
      reservationTable,
      reservationTime,
      reservationOrder,
    } = req.body;
    try {
      const reservation = await Reservation.create({
        reservationCustomer,
        reservationTable,
        reservationTime,
        reservationOrder,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create reservation",
      });
    }
  }
};
