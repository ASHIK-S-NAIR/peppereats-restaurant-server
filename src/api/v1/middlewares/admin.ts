import { Request, Response, NextFunction, Router } from "express";
const Admin = require("../models/admin");

export const getAdminById = (req: Request, res:Response, next: NextFunction, id: Router) => {
    try {
        const admin = Admin.findById({_id: id});
        req.profile = admin;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Failed to get admin by id",
          });
    }
}