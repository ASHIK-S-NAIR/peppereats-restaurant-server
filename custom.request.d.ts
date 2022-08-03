// import {Express, Request} from "express";

declare namespace Express {
    export interface Request {
      menu?: string;
    }
  }