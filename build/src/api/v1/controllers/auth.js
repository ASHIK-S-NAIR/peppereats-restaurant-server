"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSignupVerify = exports.customerSignupOtp = exports.customerLoginVerify = exports.customerLoginOtp = exports.logout = exports.adminLogin = exports.adminSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const reservation_1 = require("./reservation");
const Admin = require("../models/admin");
const Customer = require("../models/customer");
const Reservation = require("../models/reservation");
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userFirstName, userLastName, userPhoneNumber, userEmail, userPassword, } = req.body;
        const admin = yield Admin.create({
            adminFirstName: userFirstName,
            adminLastName: userLastName,
            adminPhoneNumber: userPhoneNumber,
            adminEmail: userEmail,
            password: userPassword,
        });
        yield admin.save();
        admin.adminEncry_password = undefined;
        admin.salt = undefined;
        admin.createdAt = undefined;
        admin.updatedAt = undefined;
        return res.json(admin);
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to adminSignup",
        });
    }
});
exports.adminSignup = adminSignup;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, userPassword } = req.body;
        const admin = yield Admin.findOne({ adminEmail: userEmail });
        if (!admin) {
            return res.status(400).json({ error: " Invalid email or password" });
        }
        if (admin.authenticate(userPassword)) {
            const token = jsonwebtoken_1.default.sign({ _id: admin._id }, process.env.SECRET);
            res.cookie("token", token, {
                expires: new Date(Date.now() + 999),
                httpOnly: true,
            });
            const { _id, adminFirstName, adminLastName, adminPhoneNumber, adminEmail, role, } = admin;
            return res.status(200).json({
                token,
                admin: {
                    _id,
                    adminFirstName,
                    adminLastName,
                    adminPhoneNumber,
                    adminEmail,
                    role,
                },
            });
        }
        return res.status(400).json({ error: " Invalid Email or password" });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to login Admin",
        });
    }
});
exports.adminLogin = adminLogin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Logout Successfull",
    });
});
exports.logout = logout;
const customerLoginOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userPhoneNumber } = req.body;
        const customer = yield Customer.findOne({
            customerPhoneNumber: userPhoneNumber,
        });
        if (!customer) {
            console.log({ isCustomer: false });
            return res.status(200).json({ isCustomer: false });
        }
        yield client.verify.v2
            .services(process.env.TWILIO_SERVICE_ID)
            .verifications.create({ to: `+91${userPhoneNumber}`, channel: "sms" })
            .then((verification) => {
            console.log({ isCustomer: true, verification });
            return res.status(200).json({ isCustomer: true, verification });
        })
            .catch((error) => {
            return `Error with otp, ${error}`;
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "cusotmer login failed",
        });
    }
});
exports.customerLoginOtp = customerLoginOtp;
const customerLoginVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userPhoneNumber, otp } = req.body;
    yield client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({ to: `+91${userPhoneNumber}`, code: otp })
        .then((verification_check) => __awaiter(void 0, void 0, void 0, function* () {
        yield Customer.findOne({ customerPhoneNumber: userPhoneNumber })
            .then((customer) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("reached here at reservation section");
            (0, reservation_1.createReservation)(req, res);
        }))
            .catch((error) => {
            return res
                .status(400)
                .json({ message: `Error with verify, ${error}` });
        });
    }))
        .catch((error) => {
        res.status(400).json({
            message: "failed for verfiy",
        });
    });
});
exports.customerLoginVerify = customerLoginVerify;
const customerSignupOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userPhoneNumber } = req.body;
        yield client.verify.v2
            .services(process.env.TWILIO_SERVICE_ID)
            .verifications.create({ to: `+91${userPhoneNumber}`, channel: "sms" })
            .then((verification) => {
            console.log("verfication", verification);
            return res.status(200).json(verification);
        })
            .catch((error) => {
            return `Error with otp, ${error}`;
        });
    }
    catch (error) {
        console.log("error makeotp", error.message);
        return res.status(404).json({
            message: "cusotmer signupOtp failed",
        });
    }
});
exports.customerSignupOtp = customerSignupOtp;
const customerSignupVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userPhoneNumber, userFirstName, userLastName, userEmail, otp } = req.body;
    try {
        yield client.verify.v2
            .services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks.create({ to: `+91${userPhoneNumber}`, code: otp })
            .then((verification_check) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Verfication_check_stock", verification_check);
            yield Customer.create({
                customerFirstName: userFirstName,
                customerLastName: userLastName,
                customerEmail: userEmail,
                customerPhoneNumber: userPhoneNumber,
            })
                .then((customer) => {
                const token = jsonwebtoken_1.default.sign({ _id: customer._id }, process.env.SECRET);
                res.cookie("token", token, {
                    expires: new Date(Date.now() + 999),
                    httpOnly: true,
                });
                const { _id, customerFirstName, customerLastName, customerPhoneNumber, customerEmail, role, } = customer;
                return res.status(200).json({
                    token,
                    customer: {
                        _id,
                        customerFirstName,
                        customerLastName,
                        customerPhoneNumber,
                        customerEmail,
                        role,
                    },
                });
            })
                .catch((error) => {
                return res
                    .status(400)
                    .json({ message: `Error with verify, ${error}` });
            });
        }))
            .catch((error) => {
            res.status(400).json({
                message: "failed for verfiy",
            });
        });
    }
    catch (error) {
        console.log("error verfiy", error.message);
        return res.status(404).json({
            message: "cusotmer signupVerify failed",
        });
    }
});
exports.customerSignupVerify = customerSignupVerify;
//# sourceMappingURL=auth.js.map