import type { Request, Response, NextFunction } from "express";
import { prettifyError, type ZodType } from "zod";

export const validate = (schema: ZodType) => 
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success){
            return res.status(400).json({ success: false, errors: prettifyError })
        }
        next();
};  