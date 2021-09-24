import { connection } from "../app/database/mysql";
import { FileModel } from './file.model';


/**
 * 存储文件信息
 */
export const createFile = async (file: FileModel) => {
  // 准备查询
  const statement = `
    INSERT INTO file
    SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, file);

  // 提供数据
  return data;
};

/**
 * 按照 ID查找文件
 */
export const findFileById = async (fileId: number) => {
  const statement = `
    SELECT * FROM file
    WHERE id = ?
  `;

  const [data] = await connection.promise().query(statement, fileId);
  return data[0];

}
