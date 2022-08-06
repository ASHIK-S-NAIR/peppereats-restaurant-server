import { Request, Response, NextFunction, Router } from "express";
const Customer = require("../models/customer");

export const getCustomerById = (req: Request, res:Response, next: NextFunction, id: Router) => {
    try {
        const customer = Customer.findById({_id: id});
        req.profile = customer;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Failed to get customer by id",
          });
    }
}