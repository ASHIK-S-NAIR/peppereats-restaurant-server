import { Schema, model } from "mongoose";

interface IReservation {
  reservationCustomer: String;
  reservationDate: Date;
  reservationTable: String;
  reservationTime: String;
  reservationOrder: [String];
  reservationStatus: String;
}

const reservationSchema = new Schema<IReservation>(
  {
    reservationCustomer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    reservationDate: {
      type: Date,
      default: Date.now,
    },
    reservationTable: {
      type: String,
      enum: [
        "T1",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7",
        "T8",
        "T9",
        "T10",
        "T11",
        "T12",
        "T13",
        "T14",
        "T15",
        "T16",
        "T17",
        "T18",
      ],
      required: true,
    },
    reservationTime: {
      type: String,
      enum: ["05:00PM", "06:00PM", "07:00PM", "08:00PM", "09:00PM", "10:00PM"],
      required: true,
    },
    reservationOrder: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
    reservationStatus: {
      type: String,
      enum: ["Unattended", "Verified", "PreCancellation", "PostCancellation"],
      default: "Unattended"
    },
  },
  { timestamps: true }
);

module.exports = model("Reservation", reservationSchema);
