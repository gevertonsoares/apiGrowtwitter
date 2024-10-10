import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export class AuthMiddleware {
    public static async validate(req: Request, res: Response, next: NextFunction) {
        const { authorization: bearerToken } = req.headers;

        if (!bearerToken) {
            return res.status(401).json({
                ok: false,
                message: "Token é obrigatório"
            })
        }

        const jwtToken = bearerToken.replace(/Bearer/i, '').trim();

        try {
            const secret = process.env.JWT_SECRET as string
            const userLogged = jwt.verify(jwtToken, secret)

            req.body.user = userLogged

            return next()
        } catch (err) {
            return res.status(401).json({
                ok: false,
                message: "Token inválido"
            })
        }
    }
}