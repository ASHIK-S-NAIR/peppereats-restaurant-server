import { Request, Response } from "express";
const Reservation = require("../models/reservation");
const ReservationTable = require("../models/reservationTable");
import moment from "moment";

export const createReservation = async (
  req: Request<
    {},
    {},
    {
      reservationTable: "string";
      reservationTime: "string";
      reservationOrders: "array";
    },
    {}
  >,
  res: Response,
  customer: any
) => {
  {
    const { reservationTable, reservationTime, reservationOrders } = req.body;
    try {
      const reservation = await Reservation.create({
        reservationCustomer: {
          customerId: customer._id,
          customerFirstName: customer.customerFirstName,
          customerLastName: customer.customerLastName,
          customerPhoneNumber: customer.customerPhoneNumber,
          customerEmail: customer.customerEmail,
        },
        reservationTable,
        reservationTime,
        reservationOrders,
      });

      const reservationTableDB = await ReservationTable.findOne({
        reservationTableDate: reservation.reservationDate,
      });

      const reservationTableTimeTableItem =
        reservationTableDB.reservationTableTimeTable.find(
          (reservationTableTimeTableItem: any) =>
            reservationTableTimeTableItem.time === reservation.reservationTime
        );

      reservationTableTimeTableItem.reservationTable.map(
        (reservationTableItem: any) => {
          reservationTableItem.table === reservation.reservationTable
            ? (reservationTableItem.reservation = reservation._id)
            : "";
        }
      );

      reservationTableDB.reservationTableTimeTable.map(
        (reservationTableTimeTableItemNew: any) => {
          reservationTableTimeTableItemNew.time === reservation.reservationTime
            ? (reservationTableTimeTableItemNew.reservationTable =
                reservationTableTimeTableItem.reservationTable)
            : "";
        }
      );

      await ReservationTable.findOneAndUpdate(
        {
          reservationTableDate: moment(Date.now()).format("DD-MM-yyyy"),
        },
        {
          $set: {
            reservationTableTimeTable:
              reservationTableDB.reservationTableTimeTable,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Successfully created the reservation",
      });
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({
        message: "Failed to create reservation",
      });
    }
  }
};

export const getReservation = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(req.reservation);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get the reservation",
    });
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
  const {
    reservationTable,
    reservationTime,
    reservationOrder,
    reservationStatus,
  } = req.body;
  try {
    await Reservation.findByIdAndUpdate(
      { _id: req.reservation._id },
      {
        $set: {
          reservationTable,
          reservationTime,
          reservationOrder,
          reservationStatus,
        },
      },
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
