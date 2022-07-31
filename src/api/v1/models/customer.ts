import { Schema, model } from "mongoose";

interface ICustomer {
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: number;
  customerEmail: string;
  customerReservation: [object];
}

const customerSchema = new Schema<ICustomer>(
  {
    customerFirstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    customerLastName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    customerPhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    customerEmail: {
      type: String,
      unique: true,
      maxlength: 32,
    },
    customerReservation: [
      {
        reservation: {
          type: Schema.Types.ObjectId,
          ref: "Reservation",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model<ICustomer>("Customer", customerSchema);
