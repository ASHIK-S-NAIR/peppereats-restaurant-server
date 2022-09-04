"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectConfig = void 0;
const mongoose_1 = require("mongoose");
const connectConfig = () => {
    (0, mongoose_1.connect)("mongodb://localhost:27017/peppereats")
        .then(() => console.log("DB connected"))
        .catch((err) => {
        console.log("DB Error", err.message);
    });
};
exports.connectConfig = connectConfig;
//# sourceMappingURL=config.js.map