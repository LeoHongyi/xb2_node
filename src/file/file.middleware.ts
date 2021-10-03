import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';

/**
 * 创建一个 Multer
 */
const fileUpload = multer({
  dest: 'uploads/',
});
/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');


export const fileProcessor = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { path } = request.file;

  let image: Jimp;

  try {
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }
  const { imageSize, tags } = image['_exif'];

  request.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags)
  };

  console.log(image);
  imageResizer(image, request.file);
  next()
}
