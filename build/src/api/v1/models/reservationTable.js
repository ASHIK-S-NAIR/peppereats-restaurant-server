"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reservationTableSchema = new mongoose_1.Schema({
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
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: "Reservation",
                        default: null,
                    },
                },
            ],
        },
    ],
}, { timestamps: true });
module.exports = (0, mongoose_1.model)("ReservationTable", reservationTableSchema);
//# sourceMappingURL=reservationTable.js.map