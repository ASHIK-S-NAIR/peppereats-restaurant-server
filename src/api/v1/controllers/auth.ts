import { json, Request, Response } from "express";
import jwt from "jsonwebtoken";
const Admin = require("../models/admin");
const Customer = require("../models/customer");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

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
      const token = jwt.sign({ _id: admin._id }, process.env.SECRET as string);
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

// export const findCustomer = async (req: Request, res: Response) => {
//   try {
//     const { userPhoneNumber } = req.body;
//     const customer = Customer.findOne({ customerPhoneNumber: userPhoneNumber });
//     if (!customer) {
//       return res.status(200).json({ isCustomer: false });
//     }

//     return res.status(200).json({ isCustomer: true });
//   } catch (error) {
//     return res.status(404).json({
//       message: "cusotmer checking failed",
//     });
//   }
// };

// export const makeOtp = async (phonenumber: number) => {
//   try {
//     await client.verify.v2
//       .services(process.env.TWILIO_SERVICE_ID as string)
//       .verifications.create({ to: `+91${phonenumber}`, channel: "sms" })
//       .then((verification: any) => {
//         console.log("verfication", verification);
//         return verification;
//       })
//       .catch((error: any) => {
//         return `Error with otp, ${error}`;
//       });
//   } catch (error: any) {
//     console.log(error.message);
//     return "Error for otp generation";
//   }
// };

// export const verifyOtp = (phoneNumber: number, otp: string) => {
//   try {
//     client.verify.v2
//       .services(process.env.TWILIO_SERVICE_ID)
//       .verificationChecks.create({ to: `+91${phoneNumber}`, code: otp })
//       .then((verification_check: any) => {
//         console.log("Verfication_check_stock", verification_check);
//         return verification_check;
//       })
//       .catch((error: any) => {
//         return `Error with verify, ${error}`;
//       });
//   } catch (error: any) {
//     console.log(error.message);
//     return "Error for otp verification";
//   }
// };

export const customerLogin = async (req: Request, res: Response) => {
  try {
    const { userPhoneNumber } = req.body;

    const customer = await Customer.findOne({
      customerPhoneNumber: userPhoneNumber,
    });
    if (!customer) {
      return res.status(200).json({ isCustomer: false });
    }

    // const response = await makeOtp(userPhoneNumber);
    // console.log("response", response);

    return res.send("reached her send");
    // .then((verfication: any) => {
    //   return res.status(200).json({
    //     isCustomer: true,
    //     verfication,
    //   });
    // });
  } catch (error) {
    return res.status(404).json({
      message: "cusotmer login failed",
    });
  }
};

export const customerSignupOtp = async (req: Request, res: Response) => {
  try {
    const { userPhoneNumber, userFirstName, userLastName, userEmail } =
      req.body;
    await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID as string)
      .verifications.create({ to: `+91${userPhoneNumber}`, channel: "sms" })
      .then((verification: any) => {
        console.log("verfication", verification);
        return res.status(200).json(verification);
      })
      .catch((error: any) => {
        return `Error with otp, ${error}`;
      });
  } catch (error: any) {
    console.log("error makeotp", error.message);
    return res.status(404).json({
      message: "cusotmer signupOtp failed",
    });
  }
};

export const customerSignupVerify = async (req: Request, res: Response) => {
  const { userPhoneNumber, userFirstName, userLastName, userEmail, otp } =
    req.body;
  try {
    await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: `+91${userPhoneNumber}`, code: otp })
      .then(async (verification_check: any) => {
        console.log("Verfication_check_stock", verification_check);
        await Customer.create({
          customerFirstName: userFirstName,
          customerLastName: userLastName,
          customerEmail: userEmail,
          customerPhoneNumber: userPhoneNumber,
        })
          .then((customer: any) => {
            return res.status(200).json(customer);
          })
          .catch((error: any) => {
            return res
              .status(400)
              .json({ message: `Error with verify, ${error}` });
          });
      })
      .catch((error: any) => {
        res.status(400).json({
          message: "failed for verfiy",
        });
      });
  } catch (error: any) {
    console.log("error verfiy", error.message);
    return res.status(404).json({
      message: "cusotmer signupVerify failed",
    });
  }
};
