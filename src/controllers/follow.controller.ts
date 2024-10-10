import { Request, Response } from "express";
import { followService } from "../services/follow.service";

export class FollowController {
    public static async createFollow(req: Request, res: Response) {
        try {
            const {followerId, followingId} = req.body

            const followUp = await followService.followUser(followerId, followingId)

            return res.status(201).json({
                ok: true,
                message: followUp.message,
                followUp
            });      

        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async unfollowUser(req: Request, res: Response) {
        try {
            const {followerId, followingId} = req.body

            const unfollow = await followService.unfollowUser(followerId, followingId);

            return res.status(201).json({
                ok: true,
                message: unfollow.message
            });  

        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async getFollowers(req: Request, res: Response) {
        try {
            const {userId} = req.params

            const Followers = await followService.getFollowers(userId)

            return res.status(201).json({
                ok: true,
                message: "Seguidores deste usuário",
                Followers
            }); 

        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }

    public static async getFollowings(req: Request, res: Response) {
        try {
            const {userId} = req.params

            const Followings = await followService.getFollowing(userId)

            return res.status(201).json({
                ok: true,
                message: "Quem este usuário segue.",
                Followings
            }); 

        } catch (err) {
            return res.status(500).json({
                ok: false,
                message: `Ocorreu um erro inesperado. Erro: ${(err as Error).name} - ${(err as Error).message}`
            });
        }
    }
}
