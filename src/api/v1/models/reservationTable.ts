import { model, Schema } from "mongoose";

interface IreservationTable {
  reservationTableDate: Date;
  time05PM: Schema.Types.ObjectId;
  time06PM: Schema.Types.ObjectId;
  time07PM: Schema.Types.ObjectId;
  time08PM: Schema.Types.ObjectId;
  time09PM: Schema.Types.ObjectId;
  time10PM: Schema.Types.ObjectId;
}

const reservationTableSchema = new Schema<IreservationTable>({
  reservationTableDate: {
    type: Date,
    required: true,
    unique: true,
  },
  time05PM: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    default: "",
  },
  time06PM: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    default: "",
  },
  time07PM: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    default: "",
  },
  time08PM: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    default: "",
  },
  time09PM: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    default: "",
  },
  time10PM: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    default: "",
  },
}, { timestamps: true });

module.exports = model("ReservationTable", reservationTableSchema);
