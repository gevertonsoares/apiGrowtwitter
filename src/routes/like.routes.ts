import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import { AuthMiddleware } from "../middlewares/auth/auth.middlewares";

export class LikeRoutes {
    public static execute(): Router {
        const router = Router();

        router.post("/", [AuthMiddleware.validate], LikeController.create);
        router.delete("/:id",[AuthMiddleware.validate], LikeController.delete);

        return router;
    }
}