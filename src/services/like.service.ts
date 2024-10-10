import { prismaConnection } from "../database/prisma.connection";


export class LikeService {
    public static async createLike(id: string, username: string) {
        try {
            const existTweet = await prismaConnection.tweet.findUnique({
                where: { id, deleted: false }
            });

            if (!existTweet) {
                throw new Error("Tweet não encontrado");
            }

            const existLike = await prismaConnection.like.findFirst({
                where: {
                    tweetId: id,
                    username,
                }
            });

            if (existLike) {
                throw new Error("Este like já existe");
            }

            await prismaConnection.like.create({
                data: {
                    tweetId: id,
                    username
                }
            });

            return { 
                ok: true, 
                message: "Like efetuado com sucesso!" 
            };  
        } catch (error) {
            throw new Error(`Erro ao criar o like: ${(error as Error).message}`);
        }
    }

    public static async deleteLike(id: string, username: string) {
        try {
            const existTweet = await prismaConnection.tweet.findUnique({
                where: { 
                    id, 
                    deleted: false 
                }
            });

            if (!existTweet) {
                throw new Error("Tweet não encontrado");
            }

            const existLike = await prismaConnection.like.findFirst({
                where: {
                    tweetId: id,
                    username,
                }
            });

            if (!existLike) {
                throw new Error("Like não encontrado");
            }

            await prismaConnection.like.delete({
                where: {
                    id: existLike.id
                }
            });

            return { 
                ok: true, 
                message: "Like removido com sucesso!"
             };
        } catch (error) {
            throw new Error(`Erro ao deletar o like: ${(error as Error).message}`);
        }
    }
}



