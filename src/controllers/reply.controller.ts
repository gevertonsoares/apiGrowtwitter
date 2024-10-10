import { prismaConnection } from "../database/prisma.connection";
import { Request, Response } from "express";
import { ReplyService } from "../services/reply.service";

export class ReplyController {
    public static async create(req: Request, res: Response) {
        try {
            const { user, content, tweetOriginalId } = req.body;

            const tweetReplyCreated = await ReplyService.createReply(user.username ,content, tweetOriginalId)

            return res.status(201).json({
                ok: true,
                message: "Reply criado com sucesso",
                reply: tweetReplyCreated,
            });
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`,
            });
        }
    }
}
