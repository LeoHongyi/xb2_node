import path from 'path';
import Jimp from 'jimp';
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

export const imageResizer = async (image: Jimp, file: Express.Multer.File) => {
  const { imageSize } = image['_exif'];

  const filePath = path.join(file.destination, 'resized', file.fieldname);

  // 大尺寸
  if (imageSize.width > 1280) {
    image
      .resize(1280, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-large`);
  }

  // 中等尺寸
  if (imageSize.width > 640) {
    image
      .resize(640, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-medium`);
  }

  // 缩略图
  if (imageSize.width > 320) {
    image
      .resize(320, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-thumbnail`);
  }
}
