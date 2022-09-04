"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Reservation",
            },
        },
    ],
    role: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
module.exports = (0, mongoose_1.model)("Customer", customerSchema);
//# sourceMappingURL=customer.js.map