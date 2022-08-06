import { Schema, model } from "mongoose";

interface ICustomer {
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: number;
  customerEmail: string;
  customerReservation: [object];
  role: Number;
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
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model<ICustomer>("Customer", customerSchema);
