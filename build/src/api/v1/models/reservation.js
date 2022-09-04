"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const reservationSchema = new mongoose_1.Schema({
    reservationCustomer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Customer",
    },
    reservationDate: {
        type: String,
        default: (0, moment_1.default)(Date.now()).format("DD-MM-yyyy"),
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
    reservationOrder: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Menu" }],
    reservationStatus: {
        type: String,
        enum: ["Unattended", "Verified", "PreCancellation", "PostCancellation"],
        default: "Unattended"
    },
}, { timestamps: true });
module.exports = (0, mongoose_1.model)("Reservation", reservationSchema);
//# sourceMappingURL=reservation.js.map