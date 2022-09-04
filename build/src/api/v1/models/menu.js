"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const menuSchema = new mongoose_1.Schema({
    menuName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 32
    },
    menuCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    menuPrice: {
        type: Number,
        required: true
    },
    menuDescription: {
        type: String,
        required: true,
        maxlength: 500
    },
    menuImage: {
        publicId: {
            type: String
        },
        url: {
            type: String
        }
    }
}, { timestamps: true });
module.exports = (0, mongoose_1.model)("Menu", menuSchema);
//# sourceMappingURL=menu.js.map