import * as express from "express"
import { Binary } from "mongodb"

declare global {
    namespace Express {
        interface Request {
            menu ?: any,
            category ?: any,
            reservation ?: any,
            profile ?: any,
            auth ?: any,
            user ?: any
            customer ?: any
        }
    }
}