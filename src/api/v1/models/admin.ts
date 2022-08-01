import { Schema, model } from "mongoose";
import { createHmac } from "crypto";
import { v4 } from "uuid";

interface IAdmin {
  adminFirstName: String;
  adminLastName: String;
  adminPhoneNumber: Number;
  adminEmail: String;
  adminEncry_password: String;
  salt: String;
  password: String;
  _password: String;
  securePassword: Function;
}

const adminSchema = new Schema<IAdmin>(
  {
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
      maxlength: 10
    },
    adminEmail: {
      type: String,
      unique: true,
      maxlength: 32,
      required: true
    },
    adminEncry_password: String,
    salt: String,
  },
  { timestamps: true }
);

adminSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = v4();
    this.adminEncry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

adminSchema.methods = {
  authenticate: function (plainPassword: string) {
    return this.securePassword(plainPassword) === this.adminEncry_password;
  },

  securePassword: function (plainPassword: string) {
    if (!plainPassword) {
      return "";
    }
    try {
      return createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error: any) {
      console.log(error.message);
    }
  },
};

module.exports = model<IAdmin>("Admin", adminSchema);
