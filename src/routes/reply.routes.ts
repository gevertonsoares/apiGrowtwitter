import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller";
import { AuthMiddleware } from "../middlewares/auth/auth.middlewares";
import { CreateTweetMiddleware } from "../middlewares/create-tweet.middlewares";



export class ReplyRoutes {
    public static execute(): Router {
        const router = Router();

        router.post("/", [AuthMiddleware.validate, CreateTweetMiddleware.validate], ReplyController.create);
 

        return router;
    }
}