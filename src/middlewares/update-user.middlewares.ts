import { NextFunction, Request, Response } from "express";

export class  UpdateUserMiddleware {
    public static async validate (req: Request, res: Response, next: NextFunction) {
        let {username, email, password} = req.body;

        if(username && typeof username !== 'string') {
            return res.status(400).json({
                ok: false,
                message: "Valor inválido para username"
            });
        }
        
        if(email && (typeof email !== 'string' || !email.includes("@"))) {
            return res.status(400).json({
                ok: false,
                message: "Valor inválido para email"
            });
        }

        if(password && (typeof password !== 'string' || password.length < 5)) {
            return res.status(400).json({
                ok: false,
                message: "Informe uma senha com no mínimo 5 caracteres"
            });
        }

        return next();      
    }
}