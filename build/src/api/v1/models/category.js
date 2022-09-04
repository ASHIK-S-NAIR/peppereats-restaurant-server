"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 32
    },
    menuList: [
        {
            menu: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Menu",
            },
        },
    ],
}, { timestamps: true });
module.exports = (0, mongoose_1.model)('Category', categorySchema);
//# sourceMappingURL=category.js.map