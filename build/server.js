"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const ReservationTable = require("./src/api/v1/models/reservationTable");
const categoryRoute = require("./src/api/v1/routes/category");
const authRoute = require("./src/api/v1/routes/auth");
const menuRoute = require("./src/api/v1/routes/menu");
const adminRoute = require("./src/api/v1/routes/admin");
const customerRoute = require("./src/api/v1/routes/cutomer");
const reservationRoute = require("./src/api/v1/routes/reservation");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
(0, mongoose_1.connect)(process.env.DATABASE)
    .then(() => console.log("DB connected"))
    .catch((err) => {
    console.log("DB Error", err.message);
});
app.use("/api/v1", categoryRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", menuRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", customerRoute);
app.use("/api/v1", reservationRoute);
app.get("/", (req, res) => {
    console.log("Working properly");
    return res.status(200).json({
        message: "all is well",
    });
});
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
//# sourceMappingURL=server.js.map