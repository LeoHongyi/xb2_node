import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';
/**
 * 文件过滤器
 */
export const fileFilter = (fileType: Array<string>) => {
  return (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
  ) => {
    const allowed = fileType.some(type => type === file.mimetype);

    if (allowed) {
      //允许上传
      callback(null, true);
    } else {
      callback(new Error('FILE_TYPE_NOT_ACCEPT'));
    }
  }
}
const fileUploadFilter = fileFilter(['image/png', 'image/jpg', 'image/jpeg']);

/**
 * 创建一个 Multer
 */
const fileUpload = multer({
  dest: 'uploads/',
  fileFilter: fileUploadFilter
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
