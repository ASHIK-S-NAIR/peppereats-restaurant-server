"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
const adminSchema = new mongoose_1.Schema({
    adminFirstName: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    adminLastName: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    adminPhoneNumber: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 10,
    },
    adminEmail: {
        type: String,
        unique: true,
        maxlength: 32,
        required: true,
    },
    adminEncry_password: String,
    salt: String,
    role: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });
adminSchema
    .virtual("password")
    .set(function (password) {
    this._password = password;
    this.salt = (0, uuid_1.v4)();
    this.adminEncry_password = this.securePassword(password);
})
    .get(function () {
    return this._password;
});
adminSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.adminEncry_password;
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) {
            return "";
        }
        try {
            return (0, crypto_1.createHmac)("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        }
        catch (error) {
            console.log(error.message);
        }
    },
};
module.exports = (0, mongoose_1.model)("Admin", adminSchema);
//# sourceMappingURL=admin.js.map