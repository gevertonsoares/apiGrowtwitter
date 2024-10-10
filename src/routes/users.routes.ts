import { Router } from 'express';
import { UserController } from "../controllers/user.controller";
import { CreateUserMiddleware } from "../middlewares/create-user.middlewares";
import { UpdateUserMiddleware } from '../middlewares/update-user.middlewares';
import { ValidUuidParamsMiddleware } from '../middlewares/valid-uuid-params.middleware';

export class UserRoutes {

    public static execute(): Router {
        const router = Router();

        router.post("/", [CreateUserMiddleware.validate], UserController.create);
        router.get("/", UserController.list);
        router.get("/:id",[ValidUuidParamsMiddleware.validate], UserController.get)
        router.put("/:id",[ValidUuidParamsMiddleware.validate, UpdateUserMiddleware.validate],UserController.update);
        router.delete("/:id",[ValidUuidParamsMiddleware.validate], UserController.delete);

        return router;
    }
}