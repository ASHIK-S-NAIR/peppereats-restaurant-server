import { Request, Response } from "express";
const Customer = require("../models/customer");

export const getCustomer = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(req.profile);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get customer from database",
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      message: "Successfully updated the customer",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update customer from database",
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.deleteOne({ _id: req.profile._id });
    return res.status(200).json({
      message: "Successfully deleted the customer",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Failed to delete customer from database",
    });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find({});
    return res.status(200).json(customers);
  } catch (error: any) {
    return res.status(400).json({
      message: "Failed to get all customers from database",
    });
  }
}
