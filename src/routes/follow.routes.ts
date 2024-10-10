import { Router } from "express";
import { FollowController } from "../controllers/follow.controller";
import { AuthMiddleware } from "../middlewares/auth/auth.middlewares";

export class FollowRoutes {
    public static execute(): Router {
        const router = Router();

        router.post("/follow", [AuthMiddleware.validate], FollowController.createFollow);
        router.post("/unfollow", [AuthMiddleware.validate], FollowController.unfollowUser);
        router.get("/followers/:userId", [AuthMiddleware.validate], FollowController.getFollowers);
        router.get("/followings/:userId", [AuthMiddleware.validate], FollowController.getFollowings);

        return router;
    }
}