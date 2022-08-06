import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { expressjwt, Request as JWTRequest } from "express-jwt";
// const expressJWT = require("express-jwt");
const Admin = require("../models/admin");

export const adminSignup = async (
  req: Request<
    {},
    {},
    {
      userFirstName: "string";
      userLastName: "string";
      userPhoneNumber: "number";
      userEmail: "string";
      userPassword: "string";
    },
    {}
  >,
  res: Response
) => {
  try {
    const {
      userFirstName,
      userLastName,
      userPhoneNumber,
      userEmail,
      userPassword,
    } = req.body;
    const admin = await Admin.create({
      adminFirstName: userFirstName,
      adminLastName: userLastName,
      adminPhoneNumber: userPhoneNumber,
      adminEmail: userEmail,
      password: userPassword,
    });
    await admin.save();
    admin.adminEncry_password = undefined;
    admin.salt = undefined;
    admin.createdAt = undefined;
    admin.updatedAt = undefined;
    return res.json(admin);
  } catch (error: any) {
    return res.status(400).json({
      message: "Failed to adminSignup",
    });
  }
};

export const adminLogin = async (
  req: Request<
    {},
    {},
    { userPhoneNumber: "number"; userPassword: "string" },
    {}
  >,
  res: Response
) => {
  try {
    const { userPhoneNumber, userPassword } = req.body;
    const admin = await Admin.findOne({ adminPhoneNumber: userPhoneNumber });

    if (!admin) {
      return res
        .status(400)
        .json({ error: " Invalid phonenumber or password" });
    }

    if (admin.authenticate(userPassword)) {
      const token = jwt.sign({ _id: admin._id }, "pepperEatsSecret");
      res.cookie("token", token, {
        expires: new Date(Date.now() + 999),
        httpOnly: true,
      });

      const {
        _id,
        adminFirstName,
        adminLastName,
        adminPhoneNumber,
        adminEmail,
      } = admin;

      return res.status(200).json({
        token,
        admin: {
          _id,
          adminFirstName,
          adminLastName,
          adminPhoneNumber,
          adminEmail,
        },
      });
    }

    return res.status(400).json({ error: " Invalid phonenumber or password" });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to login Admin",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout Successfull",
  });
};

// export const isSignedIn = expressjwt({
//   secret: "pepperEatsSecret",
//   algorithms: ["HS256"],
//   userProperty: "auth",
// });


// app.get(
//   "/protected",
//   expressjwt({ secret: "pepperEatsSecret", algorithms: ["HS256"] }),
//   function (req: JWTRequest, res: express.Response) {
//     if (!req.auth?.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   }
// );

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(400).json({ message: "Authentication Failed" });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Failed to authenticate user",
    });
  }
};
