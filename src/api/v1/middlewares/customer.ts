import { Request, Response, NextFunction, Router } from "express";
const Customer = require("../models/customer");

export const getCustomerById = async (req: Request, res:Response, next: NextFunction, id: Router) => {
    try {
        const customer = await Customer.findById({_id: id});
        req.customer = customer;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Failed to get customer by id",
          });
    }
}