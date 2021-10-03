import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { createFile, findFileById } from './file.service';
/**
 * 上传文件
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 当前用户
  const { id: userId } = request.user;

  // 所属内容
  let postId = '';
  if (request.query && request.query.post) {
    postId = (request.query as any).post;
  }


  //文件信息
  const fileInfo = _.pick(request.file, [
    'originalname',
    'mimetype',
    'filename',
    'size',
  ]);
  try {
    const data = await createFile({
      ...fileInfo,
      userId,
      postId,
      ...request.fileMetaData,
    })
    response.status(201).send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * 文件服务
 */
export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 从地址参数里得到文件 ID
  const { fileId } = request.params;

  try {
    // 查找文件信息
    const file = await findFileById(parseInt(fileId, 10));
    const { size } = request.query;

    let filename = file.filename;
    let root = 'uploads';
    let resized = 'resized';

    if (size) {
      const imageSizes = ['large', 'medium', 'thumbnail'];
      if (!imageSizes.some(item => item == size)) {
        throw new Error('FILE_NOT_FOUND');
      }

      const fileExist = fs.existsSync(
        path.join(root, resized, `${filename}-${size}`)
      );

      //设备文件与目录
      if (fileExist) {
        filename = `${filename}-${size}`;
        root = path.join(root, resized);
      }
    }

    // 做出响应
    response.sendFile(file.filename, {
      root: 'uploads',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 文件信息
 */

export const metadata = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //文件 ID
  const { fileId } = request.params;

  try {
    const file = await findFileById(parseInt(fileId, 10));

    //响应数据
    const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata']);

    response.send(data);
  } catch (error) {
    next(error);
  }

}
