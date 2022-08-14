import * as express from "express"
import { Binary } from "mongodb"

declare global {
    namespace Express {
        interface Request {
            menu ?: any,
            category ?: any,
            profile ?: any,
            auth ?: any,
            user ?: any
        }
    }
}