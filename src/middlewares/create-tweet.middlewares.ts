import { NextFunction, Request, Response } from "express";

export class  CreateTweetMiddleware {
    public static async validate (req: Request, res: Response, next: NextFunction) {
        const { content } = req.body;

        if(!content || typeof content !== 'string') {
            return res.status(400).json({
                ok: false,
                message: "conteúdo é obrigatório."
            });
        }
 
        return next();
            
    }
}