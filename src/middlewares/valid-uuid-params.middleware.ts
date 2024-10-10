import { NextFunction, Request, Response } from "express";
import { validate } from 'uuid';

export class  ValidUuidParamsMiddleware {
    public static async validate (req: Request, res: Response, next: NextFunction) {
        let { id } = req.params;

        if(!validate(id)) {
            return res.status(400).json({
                ok: false,
                message: "ID inválido"
            })
        }

        return next();      
    }
}