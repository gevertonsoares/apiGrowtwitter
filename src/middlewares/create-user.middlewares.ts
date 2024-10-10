import { NextFunction, Request, Response } from "express";

export class  CreateUserMiddleware {
    public static async validate (req: Request, res: Response, next: NextFunction) {
        let {name, username, email, password} = req.body;

        if(!name || typeof name !== 'string') {
            return res.status(400).json({
                ok: false,
                message: "Nome é obrigatório."
            });
        }

        if(!username || typeof username !== 'string'){
            return res.status(400).json({
                ok: false,
                message: "Username é obrigatório"
            });
        }

        
        if(!email || typeof email !== 'string' || !email.includes("@")) {
            return res.status(400).json({
                ok: false,
                message: "Informe um e-mail válido"
            });
        }

        if(!password || typeof password !== 'string' || password.length < 5) {
            return res.status(400).json({
                ok: false,
                message: "Informe uma senha com no mínimo 5 caracteres"
            });
        }

        return next();      
    }
}