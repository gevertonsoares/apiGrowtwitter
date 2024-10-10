import { prismaConnection } from "../database/prisma.connection";

export class ReplyService {
    public static async createReply(username: string, content: string, tweetOriginalId: string) {
        const tweetFound = await prismaConnection.tweet.findUnique({
            where: {
                id: tweetOriginalId
            }
        });


        if (!tweetFound) {
            throw new Error("Tweet não encontrado no banco de dados");
        }

        const tweetReplyCreated = await prismaConnection.reply.create({
            data: {
                username,
                content,
                tweetId: tweetOriginalId,
            }
        });

        return tweetReplyCreated
    }
}