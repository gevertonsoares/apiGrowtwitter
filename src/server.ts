import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../src/docs/swagger.json";
import { AuthRoutes } from './routes/auth.routes';
import { LikeRoutes } from './routes/like.routes';
import { TweetRoutes } from './routes/tweet.routes';
import { UserRoutes } from "./routes/users.routes";
import { FollowRoutes } from './routes/follow.routes';
import { ReplyRoutes } from './routes/reply.routes';

const app = express();
app.use(express.json());
app.use(cors());

//documentação swagger
app.use('/docs', swaggerUI.serve)
app.use('/docs', swaggerUI.setup(swaggerDoc))


//definição de rotas
app.use("/auth", AuthRoutes.execute());
app.use("/users", UserRoutes.execute());
app.use("/tweets", TweetRoutes.execute());
app.use("/likes",LikeRoutes.execute());
app.use("/follow",FollowRoutes.execute());
app.use("/reply",ReplyRoutes.execute());


app.listen(process.env.PORT, () => {
    console.log(`Server this running on port ${process.env.PORT}`)
});