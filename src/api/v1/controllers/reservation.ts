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
      await Reservation.create({
        reservationCustomer,
        reservationTable,
        reservationTime,
        reservationOrder,
      });
      return res.status(200).json({
        message: "Successfully created the reservation",
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

  const {reservationTable, reservationTime, reservationOrder, reservationStatus} = req.body;
  try {
    await Reservation.findByIdAndUpdate(
        { _id: req.reservation._id },
        { $set: {reservationTable, reservationTime, reservationOrder, reservationStatus} },
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
