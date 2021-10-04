import express from 'express';
import { accessControl, authGuard } from '../auth/auth.middleware';
import * as CommentController from './comment.controller';

/**
 * 导出路由
 */
const router = express.Router();

/**
 * 发表评论
 */
router.post('/comments', authGuard, CommentController.store);
/**
 * 回复评论
 */
router.post('/comments/:commentId/reply', authGuard, CommentController.reply)
/**
 * 修改评论
 */
router.patch('/comments/:commentId', authGuard, accessControl({ possession: true }), CommentController.update);
/**
 * 删除评论
 */
router.delete('/comments/:commentId', authGuard, accessControl({possession: true}), CommentController.destroy)
export default router;
