import { Request, Response } from "express";
const ReservationTable = require("../models/reservationTable")

export const getAllReservationTables = async (req: Request, res: Response) => {
  try {
    const reservationTables = await ReservationTable.find({});
    return res.status(200).json(reservationTables);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get reservationTables",
    });
  }
};

export const getReservationTable = async(req: Request, res:Response) => {
    try {
        return res.status(200).json(req.reservationTable)
    } catch (error) {
        return res.status(400).json({
            message: "Failed to get the reservationTable",
          });
    }
}
