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

export const updateReservation = async (
  req: Request<
    {},
    {},
    {
      reservationTable: "string";
      reservationTime: "string";
      reservationOrder: "array ";
      reservationStatus: "string";
    },
    {}
  >,
  res: Response
) => {
  try {
    await Reservation.findByIdAndUpdate(
        { _id: req.reservation._id },
        { $set: req.body },
        { new: true }
      );
  
      return res.status(200).json({
        message: "Successfully updated the reservation",
      });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to updatereservation",
    });
  }
};
