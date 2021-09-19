import express from 'express';
import * as authController from './auth.controller';
import { validateLoginData } from './auth.middleware';

const router = express.Router();

/**
 * 导出路由
 */
router.post('/login', validateLoginData ,authController.login);
export default router;
