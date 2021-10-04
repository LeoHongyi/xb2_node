import { Request, Response, NextFunction } from 'express';
import { createPost, deletePost, getPosts, updatePost, createPostTag, postHasTag, deletePostTag } from './post.service';
import _ from 'lodash';
import { TagModel } from '../tag/tag.model';
import { getTagByName, createTag } from '../tag/tag.service';
/**
 * 内容列表
 */
export const index = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const posts = await getPosts({sort: request.sort, filter: request.filter});
    response.send(posts);
  } catch (error) {
    next(error);
  }
}

/**
 * 创建内容
 */

export const store = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { title, content } = request.body;
  const { id: userId } = request.user;
  try {
    const data = await createPost({ title, content, userId });
    response.status(201).send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * 更新内容
 */

export const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //更新内容 ID
  const { postId } = request.params;

  // 准备数据
  // const { title, content } = request.body;

  const post = _.pick(request.body, ['title', 'content']);

  try {
    const data = await updatePost(parseInt(postId, 10), post);
    response.send(data);
  } catch (error) {
    next(error);
  }
}

export const destory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //更新内容 ID
  const { postId } = request.params;

  // 准备数据
  // const { title, content } = request.body;

  try {
    const data = await deletePost(parseInt(postId, 10));
    response.send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * 添加内容标签
 */

export const storePostTag = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //准备数据
  const { postId } = request.params;
  const { name } = request.body;

  let tag: TagModel;

  try {
    tag = await getTagByName(name);
  } catch (error) {
    next(error);
  }

  if (tag) {
    try {
      const postTag = await postHasTag(parseInt(postId, 10), tag.id);
      if (postTag) return next(new Error('POST_ALREADY_HAS_THIS_TAG'))
    } catch (error) {
      return next(error)
    }
  }

  if (!tag) {
    try {
      const data = await createTag({ name });
      tag = { id: data.insertId };
    } catch (error) {
      return next(error);
    }
  }

  //
  try {
    await createPostTag(parseInt(postId, 10), tag.id);
    response.sendStatus(201);
  } catch (error) {
    return next(error);
  }
}

/**
 * 移除内容标签
 */
export const destroyPostTag = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //准备数据
  const { postId } = request.params;
  const { tagId } = request.body;

  //移除内容标签
  try {
    await deletePostTag(parseInt(postId, 10), tagId);
    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
