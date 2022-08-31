import { Request, Response } from "express";
const Reservation = require("../models/reservation");
const ReservationTable = require("../models/reservationTable");
import moment from "moment";

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

      const reservationTableDB = await ReservationTable.findOne({
        reservationTableDate: reservation.reservationDate,
      });

      const reservationTableTimeTableItem =
        reservationTableDB.reservationTableTimeTable.find(
          (reservationTableTimeTableItem: any) =>
            reservationTableTimeTableItem.time === reservation.reservationTime
        );

      console.log(
        "reservationTableTimeTableItem",
        reservationTableTimeTableItem
      );

      reservationTableTimeTableItem.reservationTable.map(
        (reservationTableItem: any) => {
          reservationTableItem.table === reservation.reservationTable
            ? (reservationTableItem.reservation = reservation._id)
            : "";
        }
      );

      console.log(
        "reservationTableTimeTableItem",
        reservationTableTimeTableItem
      );

      reservationTableDB.reservationTableTimeTable.map(
        (reservationTableTimeTableItemNew: any) => {
          reservationTableTimeTableItemNew.time === reservation.reservationTime
            ? (reservationTableTimeTableItemNew.reservationTable =
                reservationTableTimeTableItem.reservationTable)
            : "";
        }
      );

      console.log(
        "reservationTableTimeTable",
        reservationTableDB.reservationTableTimeTable[5]
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
      return res.status(400).json({
        message: "Failed to create reservation",
      });
    }
  }
};

// export const createReservationBackend = async (
//   reservationCustomer: string,
//   reservationTable: string,
//   reservationTime: string,
//   reservationOrder: [string]
// ) => {
//   {
//     try {
//       const reservation = await Reservation.create({
//         reservationCustomer,
//         reservationTable,
//         reservationTime,
//         reservationOrder,
//       });

//       const reservationTableDB = await ReservationTable.findOne({
//         reservationTableDate: reservation.reservationDate,
//       });

//       const reservationTableTimeTableItem =
//         reservationTableDB.reservationTableTimeTable.find(
//           (reservationTableTimeTableItem: any) =>
//             reservationTableTimeTableItem.time === reservation.reservationTime
//         );

//       console.log(
//         "reservationTableTimeTableItem",
//         reservationTableTimeTableItem
//       );

//       reservationTableTimeTableItem.reservationTable.map(
//         (reservationTableItem: any) => {
//           reservationTableItem.table === reservation.reservationTable
//             ? (reservationTableItem.reservation = reservation._id)
//             : "";
//         }
//       );

//       console.log(
//         "reservationTableTimeTableItem",
//         reservationTableTimeTableItem
//       );

//       reservationTableDB.reservationTableTimeTable.map(
//         (reservationTableTimeTableItemNew: any) => {
//           reservationTableTimeTableItemNew.time === reservation.reservationTime
//             ? (reservationTableTimeTableItemNew.reservationTable =
//                 reservationTableTimeTableItem.reservationTable)
//             : "";
//         }
//       );

//       console.log(
//         "reservationTableTimeTable",
//         reservationTableDB.reservationTableTimeTable[5]
//       );

//       await ReservationTable.findOneAndUpdate(
//         {
//           reservationTableDate: moment(Date.now()).format("DD-MM-yyyy"),
//         },
//         {
//           $set: {
//             reservationTableTimeTable:
//               reservationTableDB.reservationTableTimeTable,
//           },
//         },
//         { new: true }
//       );
//       return res.status(200).json({
//         message: "Successfully created the reservation",
//       });
//     } catch (error) {
//       return res.status(400).json({
//         message: "Failed to create reservation",
//       });
//     }
//   }
// };

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
