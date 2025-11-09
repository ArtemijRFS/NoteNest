import type { Request, Response, NextFunction } from "express";
import { errorResponce } from "../utils/responses";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    console.log(error);
    errorResponce(res, 500, error);
}