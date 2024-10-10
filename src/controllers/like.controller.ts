import { Request, Response } from "express";
import { LikeService } from "../services/like.service";


export class LikeController {
    public static async create(req: Request, res: Response) {
        try {
            
            const { user, id } = req.body;

            const likeResponseService = await LikeService.createLike(id, user.username)

            return res.status(201).json({
                ok: true,
                message: likeResponseService.message
            });

        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }  

    public static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { user } = req.body;

            const likeResponseService = await LikeService.deleteLike(id, user.username) 

            return res.status(200).json({
                ok: true,
                message: likeResponseService.message
            });


        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }
}