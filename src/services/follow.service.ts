import { ok } from "assert";
import { prismaConnection } from "../database/prisma.connection";

export class followService {
    public static async followUser(followerId: string, followingId: string){

        if (followerId === followingId ) {
            throw new Error('Você não pode seguir a si mesmo.')
        }

        const existFollow = await prismaConnection.follow.findFirst({
            where: {
                followerId,
                followingId
            } 
        })


        if (existFollow) {
            throw new Error('Você já está seguindo este usuário.')
        }

        const follow =  await prismaConnection.follow.create({
            data: {
                followerId,
                followingId
            }
        })

        return {
         ok: true,
         message: "Você começou a seguir este usuário",
         follow
        }
    }


    public static async unfollowUser(followerId: string, followingId: string){
        const existFollow = await prismaConnection.follow.findFirst({
            where: {
                followerId,
                followingId
            } 
        })

        if (!existFollow) {
            throw new Error('Você não está seguindo este usuário.')
        }

        await prismaConnection.follow.delete({
            where: {
              id: existFollow.id,
            },
        });

        return {
            ok: true, 
            message: 'Você deixou de seguir este usuário'
        }
    }


    public static async getFollowers(userId: string) {       
        const followers = await prismaConnection.follow.findMany({
            where: {
                followingId: userId
            },
            select: {
                follower: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        });
    
        
        const follows = followers.map(f => f.follower)
       
        return follows
    }
    


    public static async getFollowing(userId: string) {
        const following = await prismaConnection.follow.findMany({
            where: {
                followerId: userId
            },
            select: {
                following: { 
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        })
    
        const follows = following.map((f) => f.following)
    
        return follows
    }
    
}