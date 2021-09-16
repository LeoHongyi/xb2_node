import express from 'express';
import postRouter from '../post/post.router';
import { defaultErrorHanlder } from './app.middleware';

const app = express();

/**
 * 处理json
 */
app.use(express.json());

/**
 * 路由
 */
app.use(postRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHanlder);

export default app;
