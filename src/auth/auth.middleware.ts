import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as userService from '../user/user.service';
export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const { name, password } = request.body;
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  const user = await userService.getUserName(name, {password: true});
  if (!user) return next(new Error('USER_DOES_NOT_EXIST'));

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));
  next();
}
