import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const categoryRoute = require("./src/api/v1/routes/category");
const authRoute = require("./src/api/v1/routes/auth");
const menuRoute = require("./src/api/v1/routes/menu");
const adminRoute = require("./src/api/v1/routes/admin");
const customerRoute = require("./src/api/v1/routes/cutomer");

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

app.get("/", (req: Request, res: Response) => {
  console.log("Working properly");

  return res.status(200).json({
    message: "all is well",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
