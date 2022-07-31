import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import cors from "cors";
// const path = require("path");

// dotenv.config({ path: path.resolve(__dirname, "/.env") });

const categoryRoute = require("./src/api/v1/routes/category");
const authRoute = require("./src/api/v1/routes/auth");

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT: any = process.env.PORT ?? 4000;

connect("mongodb://localhost:27017/peppereats")
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("DB Error", err.message);
  });

app.use("/api/v1", categoryRoute);
app.use("/api/v1", authRoute);

app.get("/", (req: Request, res: Response) => {
  console.log("Working properly");

  return res.status(200).json({
    message: "all is well",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
