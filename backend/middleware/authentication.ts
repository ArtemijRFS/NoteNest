import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw { statusCode: 401, message: "No token provided" };
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw { statusCode: 401, message: "Malformed token" };
        }
        
        const payload = verifyToken(token);
        if (!payload) {
            throw { statusCode: 401, message: "Invalid or expired token" };
        }
        (req as any).user = payload;
        next();
    } catch (error) {
        next(error);
    }
}