import type { Response } from "express";

export function successResponce(res: Response, data: any, message: string = "Success"){
    return res.status(200).json({ success: true, message, data });
}

export function errorResponce(res: Response, status: number, error: string){
    return res.status(status).json({ success: false, error });
}