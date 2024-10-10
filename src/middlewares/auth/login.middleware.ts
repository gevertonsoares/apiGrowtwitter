import { NextFunction, Request, Response } from 'express';


export class LoginMiddleware {
    public static validate(req: Request, res: Response, next: NextFunction) {
        const { usernameOrEmail, password } = req.body;

        if (!usernameOrEmail) {
            return res.status(400).json({
              ok: false,
              message: "É preciso informar o nome de usuário ou email para realizar o login"
            });
        }

        if (typeof usernameOrEmail !== 'string') {
            return res.status(400).json({
              ok: false,
              message: "Nome de usuário ou email inválido"
            });
        }

        if (usernameOrEmail.includes('@') && !usernameOrEmail.includes(".")) {
            return res.status(400).json({
              ok: false,
              message: "Informe um email válido"
            });
        }

        if (!password || typeof password !== 'string') {
            return res.status(400).json({
              ok: false,
              message: "A senha deve ser um conjunto de caracteres"
            });
        }

        return next();
    }
}