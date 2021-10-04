import { connection } from "../app/database/mysql";
import { PostModel } from "./post.model";

/**
 * 获取内容列表
 */
export const getPosts = async () => {
  // const data = [
  //   {
  //     content: '明日出天山，苍茫云海间'
  //   },
  //   {
  //     content: '会当凌绝顶，一览众山小'
  //   },
  //   {
  //     content: '日出江花红胜火，春来江水绿如蓝'
  //   },
  // ];

  // return data;

  const statement = `
    SELECT
      post.id,
      post.title,
      post.content,
      JSON_OBJECT(
        'id', user.id,
        'name', user.name
      ) as user
    FROM post
    LEFT JOIN user
        ON user.id = post.userId
  `;

  const [data] = await connection.promise().query(statement);
  return data;

}


/***
 * 创建内容
 */
export const createPost = async (post: PostModel) => {
  const statement = `
    INSERT INTO post
    SET ?
  `;
  const [data] = await connection.promise().query(statement, post);
  return data;
}

/**
 * 更新内容
 */
export const updatePost = async (postId: number, post: PostModel) => {
  const statement = `
    UPDATE post
    SET ?
    WHERE id = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, [post, postId]);
  return data;
}

/**
 * 删除内容
 */

export const deletePost = async (postId: number) => {
  const statement = `
    DELETE FROM post WHERE id=?
  `;

  const [data] = await connection.promise().query(statement, postId);
  return data
}

/**
 * 存储内容标签
 */
export const createPostTag = async (postId: number, tagId: number) => {
  //准备查询
  const statement = `
    INSERT INTO post_tag (postId, tagId)
    values(?, ?)
  `;

  const [data] = await connection.promise().query(statement, [postId, tagId]);
  return data;
}

/**
 * 检查内容标签
 */
export const postHasTag = async (
  postId: number,
  tagId: number
) => {
  const statement = `
    SELECT * FROM post_tag
    WHERE postId=? AND tagId=?
  `;
  const [data] = await connection.promise().query(statement, [postId, tagId]);
  return data[0] ? true : false;
};

/**
 * 移除内容标签
 */
export const deletePostTag = async (postId: number, tagId: number) => {
  //准备咨询
  const statement = `
    DELETE FROM post_tag
    WHERE postId = ? AND tagId = ?
  `;
  const [data] = await connection.promise().query(statement, [postId, tagId]);
  return data;
}
