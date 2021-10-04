import { connection } from "../app/database/mysql";
import { TagModel } from "./tag.model";

/**
 * 创建标签
 */
export const createTag = async (
  tag: TagModel
) => {
  const statement = `
    INSERT INTO tag
    SET ?
  `
  const [data] = await connection.promise().query(statement, tag);
  return data as any;
}

/**
 * 按照名字查找标签
 */
export const getTagByName = async (tagName: string) => {
  //准备查询
  const statement = `
    SELECT id, name FROM tag
    WHERE name =  ?
  `;

  const [data] = await connection.promise().query(statement, tagName);
  return data[0];
}
