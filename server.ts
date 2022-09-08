import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import moment from "moment";

const ReservationTable = require("./src/api/v1/models/reservationTable");

const categoryRoute = require("./src/api/v1/routes/category");
const authRoute = require("./src/api/v1/routes/auth");
const menuRoute = require("./src/api/v1/routes/menu");
const adminRoute = require("./src/api/v1/routes/admin");
const customerRoute = require("./src/api/v1/routes/cutomer");
const reservationRoute = require("./src/api/v1/routes/reservation");
const reservationTableRoute = require("./src/api/v1/routes/reservationTable");

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT: any = (process.env.PORT as string) ?? 4000;

connect(process.env.DATABASE as string)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("DB Error", err.message);
  });
// connectConfig();

app.use("/api/v1", categoryRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", menuRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", customerRoute);
app.use("/api/v1", reservationRoute);
app.use("/api/v1", reservationTableRoute);

// for (let i = 0; i < 10; i++) {
//   const d = new Date();
//   d.setDate(d.getDate() + i);

//   ReservationTable.create({
//     reservationTableDate: moment(d).format("DD-MM-yyyy"),
//     reservationTableTimeTable: [
//       {
//         time: "05:00PM",
//         reservationTable: [
//           { table: "T1" },
//           { table: "T2" },
//           { table: "T3" },
//           { table: "T4" },
//           { table: "T5" },
//           { table: "T6" },
//           { table: "T7" },
//           { table: "T8" },
//           { table: "T9" },
//           { table: "T10" },
//           { table: "T11" },
//           { table: "T12" },
//           { table: "T13" },
//           { table: "T14" },
//           { table: "T15" },
//           { table: "T16" },
//           { table: "T17" },
//           { table: "T18" },
//         ],
//       },
//       {
//         time: "06:00PM",
//         reservationTable: [
//           { table: "T1" },
//           { table: "T2" },
//           { table: "T3" },
//           { table: "T4" },
//           { table: "T5" },
//           { table: "T6" },
//           { table: "T7" },
//           { table: "T8" },
//           { table: "T9" },
//           { table: "T10" },
//           { table: "T11" },
//           { table: "T12" },
//           { table: "T13" },
//           { table: "T14" },
//           { table: "T15" },
//           { table: "T16" },
//           { table: "T17" },
//           { table: "T18" },
//         ],
//       },
//       {
//         time: "07:00PM",
//         reservationTable: [
//           { table: "T1" },
//           { table: "T2" },
//           { table: "T3" },
//           { table: "T4" },
//           { table: "T5" },
//           { table: "T6" },
//           { table: "T7" },
//           { table: "T8" },
//           { table: "T9" },
//           { table: "T10" },
//           { table: "T11" },
//           { table: "T12" },
//           { table: "T13" },
//           { table: "T14" },
//           { table: "T15" },
//           { table: "T16" },
//           { table: "T17" },
//           { table: "T18" },
//         ],
//       },
//       {
//         time: "08:00PM",
//         reservationTable: [
//           { table: "T1" },
//           { table: "T2" },
//           { table: "T3" },
//           { table: "T4" },
//           { table: "T5" },
//           { table: "T6" },
//           { table: "T7" },
//           { table: "T8" },
//           { table: "T9" },
//           { table: "T10" },
//           { table: "T11" },
//           { table: "T12" },
//           { table: "T13" },
//           { table: "T14" },
//           { table: "T15" },
//           { table: "T16" },
//           { table: "T17" },
//           { table: "T18" },
//         ],
//       },
//       {
//         time: "09:00PM",
//         reservationTable: [
//           { table: "T1" },
//           { table: "T2" },
//           { table: "T3" },
//           { table: "T4" },
//           { table: "T5" },
//           { table: "T6" },
//           { table: "T7" },
//           { table: "T8" },
//           { table: "T9" },
//           { table: "T10" },
//           { table: "T11" },
//           { table: "T12" },
//           { table: "T13" },
//           { table: "T14" },
//           { table: "T15" },
//           { table: "T16" },
//           { table: "T17" },
//           { table: "T18" },
//         ],
//       },
//       {
//         time: "10:00PM",
//         reservationTable: [
//           { table: "T1" },
//           { table: "T2" },
//           { table: "T3" },
//           { table: "T4" },
//           { table: "T5" },
//           { table: "T6" },
//           { table: "T7" },
//           { table: "T8" },
//           { table: "T9" },
//           { table: "T10" },
//           { table: "T11" },
//           { table: "T12" },
//           { table: "T13" },
//           { table: "T14" },
//           { table: "T15" },
//           { table: "T16" },
//           { table: "T17" },
//           { table: "T18" },
//         ],
//       },
//     ],
//   });
// }

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
