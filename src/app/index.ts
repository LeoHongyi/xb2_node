import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
import tagRouter from '../tag/tag.router';
import avatarRouter from '../avatar/avatar.router';
import commentRouter from '../comment/comment.router';
import likeRouter from '../like/like.router';
import { defaultErrorHanlder } from './app.middleware';

const app = express();

/**
 * 处理json
 */
app.use(express.json());

/**
 * 路由
 */
app.use(postRouter, userRouter, authRouter, fileRouter, tagRouter, commentRouter, avatarRouter, likeRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHanlder);

export default app;
