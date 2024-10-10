import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { AuthMiddleware } from "../middlewares/auth/auth.middlewares";
import { CreateTweetMiddleware } from "../middlewares/create-tweet.middlewares";
import { ValidUuidParamsMiddleware } from '../middlewares/valid-uuid-params.middleware';


export class TweetRoutes {
    public static execute(): Router {
        const router = Router();

        router.post("/", [AuthMiddleware.validate, CreateTweetMiddleware.validate], TweetController.create);
        router.get("/", [AuthMiddleware.validate], TweetController.list);
        router.get("/feed", [AuthMiddleware.validate], TweetController.feed);
        router.get("/:id", [AuthMiddleware.validate, ValidUuidParamsMiddleware.validate], TweetController.getTweetById)
        router.put("/:id", [AuthMiddleware.validate, ValidUuidParamsMiddleware.validate], TweetController.update);
        router.delete("/:id", [AuthMiddleware.validate, ValidUuidParamsMiddleware.validate], TweetController.delete);

        return router;
    }
}