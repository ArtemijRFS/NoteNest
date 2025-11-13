import type { Request, Response, NextFunction } from "express";
import { errorResponce } from "../utils/responses";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    console.log("Error: ", error);

    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    errorResponce(res, statusCode, { success: false, message });
}