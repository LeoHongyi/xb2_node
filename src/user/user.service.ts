import { connection } from "../app/database/mysql";
import { UserModel } from "./user.model";

export const createUser = async (user: UserModel) => {
  //准备查询
  const statement = `
    INSERT INTO user
    SET ?
  `;

  const [data] = await connection.promise().query(statement, user);
  return data;
}

interface GetUserOptions {
  password?: boolean;
}
/**
 * 按用户名查找用户
 */
export const getUserName = async (name: string, options: GetUserOptions = {}) => {
  const statement = `
    SELECT id, name
    FROM user
    WHERE name = ?
  `;

  const [data] = await connection.promise().query(statement, name);
  return data[0];
}
