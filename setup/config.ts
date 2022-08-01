import { connect } from "mongoose";

export const connectConfig = () => {
  connect("mongodb://localhost:27017/peppereats")
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log("DB Error", err.message);
    });
};
