import * as express from "express"
import { Binary } from "mongodb"

declare global {
    namespace Express {
        interface Request {
            menu ?: any,
            category ?: any,
            admin ?: any,
            customer ?: any
        }
    }
}