import { Request, Response, NextFunction } from 'express';

/**
 * 输出 请求地址
 */
export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.url);
  next();
}

/**
 * 默认异常处理器
 */

export const defaultErrorHanlder = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let statusCode: number, message: string;
  if (error.message) {
    console.log('🙅‍♂️', error.message)
  }
  switch (error.message) {
    case 'NAME_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '请提供密码';
      break;
    case 'USER_ALREADY_EXIST':
      statusCode = 409;
      message = '用户名已被占用';
      break;
    case 'USER_DOES_NOT_EXIST':
      statusCode = 400;
      message = '用户不存在';
      break;
    case 'PASSWORD_DOES_NOT_MATCH':
      statusCode = 400;
      message = '密码不对';
      break;
    default:
      statusCode = 500
      message = '服务器暂时出了点问题 ~~ 🌲';
      break;
  }

  response.status(statusCode).send({message})
}
