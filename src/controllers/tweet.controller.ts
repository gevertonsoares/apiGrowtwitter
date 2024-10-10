import { Request, Response } from "express";
import { prismaConnection } from "../database/prisma.connection";
import TweetService from "../services/tweet.service";


export class TweetController {
    public static async create(req: Request, res: Response) {
        try {
            const { content, user } = req.body;
            
            const newTweet = await TweetService.createTweet(content, user.username)

            return res.status(201).json({
                ok: true,
                message: "Tweet criado com sucesso!",
                tweet: newTweet
            });

        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async list(req: Request, res: Response) {
        try {
            let {limit, page} = req.query;
            const { username } = req.body.user;

            let limitDefault = 10;
            let pageDefault = 1;

            if(limit) {
                limitDefault = Number(limit);
            }

            if(page) {
                pageDefault = Number(page);
            }

            const {tweets, pagination} = await TweetService.listTweets(limitDefault, pageDefault, username)

            

            return res.status(200).json({
                ok: true,
                message: "Tweets listados com sucesso",
                data: tweets,
                pagination
            })

            
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async feed(req: Request, res: Response) {
        try {
            let {limit, page} = req.query;

            let limitDefault = 10;
            let pageDefault = 1;

            if(limit) {
                limitDefault = Number(limit);
            }

            if(page) {
                pageDefault = Number(page);
            }

            const tweets = await prismaConnection.tweet.findMany({
                skip: limitDefault * (pageDefault - 1),
                take: limitDefault,
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    deleted: false,
                },
                include: {
                    likes: true,
                    _count: {
                        select: {
                            likes: true
                        }
                    }
                }
            });

            const count = await prismaConnection.tweet.count({
                where: {
                    deleted: false
                },
            });

            return res.status(200).json({
                ok: true,
                message: "Tweets listados com sucesso",
                data: tweets,
                pagination: {
                    limit: limitDefault,
                    page: pageDefault,
                    count: count,
                    totalPages: Math.ceil(count / limitDefault)
                }
            })

            
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async getTweetById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { user } = req.body;

            const tweetFound = await TweetService.getTweetById(id, user.username);

            if (!tweetFound) {
                return res.status(404).json({
                    ok: false,
                    message: "O Tweet não existe na base de dados"
                });
            }

            return res.status(200).json({
                ok: true,
                message: "Tweet encontrado",
                tweet: tweetFound
            });
            
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { content, user } = req.body;

            const tweetUpdated = await TweetService.updateTweetById(id, content, user.username)

            if (!tweetUpdated) {
                return res.status(404).json({
                    ok: false,
                    message: "Tweet não encontrado"
                });
            }
            
            return res.status(200).json({
                ok: true,
                message: "Tweet atualizado",
                tweetUpdated
            })
            
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

            const tweetDeleted = await TweetService.deleteTweetById(id, user.username)
            
            if (!tweetDeleted) {
                return res.status(404).json({
                    ok: false,
                    message: "Tweet não encontrado"
                });
            }

            return res.status(200).json({
                ok: true,
                message: "Tweet deletado com sucesso",
                tweetDeleted
            })
            
        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }
}