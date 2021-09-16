"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
app.use(express_1.default.json());
app.listen(port, () => {
    console.log('🚀 服务启动');
});
app.get('/', (request, response) => {
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
app.get('/posts', (request, response) => {
    response.send(data);
});
app.get('/posts/:postId', (request, response) => {
    const { postId } = request.params;
    const posts = data.filter(item => item.id == parseInt(postId, 10));
    response.send(posts[0]);
});
app.post('/posts', (request, response) => {
    const { content } = request.body;
    response.send({
        message: `成功创建内容${content}`,
    });
});
//# sourceMappingURL=main.js.map