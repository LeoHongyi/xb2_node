import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log('🚀 服务启动');
});

app.get('/', (request: Request, response: Response) => {
  response.send('您好');
});

const data = [
  {
    id: 1,
    title: '关月山',
    content: 'testtesttesttest',
  },
  {
    id: 2,
    title: '望岳',
    content: 'testtesttesttest',
  },
  {
    id: 3,
    title: '忆江南',
    content: 'testtesttesttest',
  },
];

app.get('/posts', (request: Request, response: Response) => {
  response.send(data);
});

app.get('/posts/:postId', (request: Request, response: Response) => {
  const { postId } = request.params;
  const posts = data.filter(item => item.id == parseInt(postId, 10));
  response.send(posts[0]);
});

app.post('/posts', (request: Request, response: Response) => {
  const { content } = request.body;

  response.send({
    message: `成功创建内容${content}`,
  });
});
