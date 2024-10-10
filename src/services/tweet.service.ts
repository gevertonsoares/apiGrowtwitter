import { prismaConnection } from "../database/prisma.connection";


class TweetService {
    public static async createTweet(content: string, username: string) {
        const newTweet = await prismaConnection.tweet.create({
            data: {  
                content, 
                username,
            }
        });

        return newTweet
    }

    public static async listTweets(limit: number, page: number, username: string) {
        const tweets = await prismaConnection.tweet.findMany({
            skip: limit * (page - 1),
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                deleted: false,
                username: username
            },
            include: {
                likes: true,
                _count: {
                    select: {
                        likes: true,
                        replies: true
                    }
                }
            }
        });

        const count = await prismaConnection.tweet.count({
            where: {
                deleted: false,
                username: username
            }
        });

        return {
            tweets,
            pagination: {
                limit,
                page,
                count,
                totalPages: Math.ceil(count / limit)
            }
        };
    }


    public static async getTweetById(id: string, username: string) {
        try {
            const tweetFound = await prismaConnection.tweet.findUnique({
                where: {
                    id,
                    username,
                    deleted: false
                }
            });

            if (!tweetFound) {
                return null;
            }

            return tweetFound;
        } catch (error) {
            throw new Error(`Erro ao buscar tweet: ${(error as Error).message}`);
        }
    }

    public static async updateTweetById(id: string, content: string, username: string){
        try {
            const tweetFound = await prismaConnection.tweet.findUnique({
                where: {
                    id,
                    username,
                    deleted: false
                }
            });

            if (!tweetFound) {
                throw new Error('Tweet não encontrado.');
            }

            const tweetUpdated = await prismaConnection.tweet.update({
                where: { id: tweetFound.id },
                data: { content }
            });

            return tweetUpdated;
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }


    public static async deleteTweetById(id: string, username: string) {
        try {
            const tweetFound = await prismaConnection.tweet.findUnique({
                where: {
                    id,
                    username,
                    deleted: false
                }
            }); 
            
            if (!tweetFound) {
                throw new Error('Tweet não encontrado.');
            }

            const tweetDeleted = await prismaConnection.tweet.update({
                where: {id: tweetFound.id },
                data: {
                    deleted: true, 
                    deletedAt: new Date()
                }
            })

            return tweetDeleted
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }
}

export default TweetService