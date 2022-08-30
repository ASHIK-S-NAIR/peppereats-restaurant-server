import { model, Schema } from "mongoose";

interface IreservationTable {
  reservationTableDate: string;
  reservationTableTimeTable: [Object];
  // time05PM: Schema.Types.ObjectId;
  // time06PM: Schema.Types.ObjectId;
  // time07PM: Schema.Types.ObjectId;
  // time08PM: Schema.Types.ObjectId;
  // time09PM: Schema.Types.ObjectId;
  // time10PM: Schema.Types.ObjectId;
}

const reservationTableSchema = new Schema<IreservationTable>(
  {
    reservationTableDate: {
      type: String,
      required: true,
      unique: true,
    },
    reservationTableTimeTable: [
      {
        time: String,
        reservationTable: [
          {
            table: String,
            reservation: {
              type: Schema.Types.ObjectId,
              ref: "Reservation",
              default: null,
            },
          },
        ],
      },
    ],
    // time05PM: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Reservation",
    //   default: null
    // },
    // time06PM: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Reservation",
    //   default: null
    // },
    // time07PM: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Reservation",
    //   default: null
    // },
    // time08PM: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Reservation",
    //   default: null
    // },
    // time09PM: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Reservation",
    //   default: null
    // },
    // time10PM: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Reservation",
    //   default: null
    // },
  },
  { timestamps: true }
);

module.exports = model("ReservationTable", reservationTableSchema);
