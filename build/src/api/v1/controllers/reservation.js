"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReservation = exports.createReservation = void 0;
const Reservation = require("../models/reservation");
const ReservationTable = require("../models/reservationTable");
const moment_1 = __importDefault(require("moment"));
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    {
        const { reservationCustomer, reservationTable, reservationTime, reservationOrder, } = req.body;
        try {
            const reservation = yield Reservation.create({
                reservationCustomer,
                reservationTable,
                reservationTime,
                reservationOrder,
            });
            const reservationTableDB = yield ReservationTable.findOne({
                reservationTableDate: reservation.reservationDate,
            });
            const reservationTableTimeTableItem = reservationTableDB.reservationTableTimeTable.find((reservationTableTimeTableItem) => reservationTableTimeTableItem.time === reservation.reservationTime);
            console.log("reservationTableTimeTableItem", reservationTableTimeTableItem);
            reservationTableTimeTableItem.reservationTable.map((reservationTableItem) => {
                reservationTableItem.table === reservation.reservationTable
                    ? (reservationTableItem.reservation = reservation._id)
                    : "";
            });
            console.log("reservationTableTimeTableItem", reservationTableTimeTableItem);
            reservationTableDB.reservationTableTimeTable.map((reservationTableTimeTableItemNew) => {
                reservationTableTimeTableItemNew.time === reservation.reservationTime
                    ? (reservationTableTimeTableItemNew.reservationTable =
                        reservationTableTimeTableItem.reservationTable)
                    : "";
            });
            console.log("reservationTableTimeTable", reservationTableDB.reservationTableTimeTable[5]);
            yield ReservationTable.findOneAndUpdate({
                reservationTableDate: (0, moment_1.default)(Date.now()).format("DD-MM-yyyy"),
            }, {
                $set: {
                    reservationTableTimeTable: reservationTableDB.reservationTableTimeTable,
                },
            }, { new: true });
            return res.status(200).json({
                message: "Successfully created the reservation",
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Failed to create reservation",
            });
        }
    }
});
exports.createReservation = createReservation;
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reservationTable, reservationTime, reservationOrder, reservationStatus, } = req.body;
    try {
        yield Reservation.findByIdAndUpdate({ _id: req.reservation._id }, {
            $set: {
                reservationTable,
                reservationTime,
                reservationOrder,
                reservationStatus,
            },
        }, { new: true });
        return res.status(200).json({
            message: "Successfully updated the reservation",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to updatereservation",
        });
    }
});
exports.updateReservation = updateReservation;
//# sourceMappingURL=reservation.js.map