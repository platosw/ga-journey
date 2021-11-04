const express = require('express');
const Blog = require('../models/blogs.js');
const blogRouter = express.Router();

// BLOG Index route
blogRouter.get('/', async (req, res) => {
    try {
        // send all blog
        res.json(await Blog.find({})); //어떻게 여기에서는 express.json() 대신 res.json() 을 쓸 수 있는지 질문하기
    } catch (error) { // 여기에서 에러는 파라미터인데 어디서 에러 데이터가 이곳으로 올 수 있는지 물어보기
        // send error
        res.status(400).json(error); // 각각의 구조에 대해서 물어보기
    }
});

// BLOG Create route
blogRouter.post('/', async (req, res) => {
    try {
        // send all blog
        res.json(await Blog.create(req.body));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

// BLOG delete route ====>> 비동기를 사용하지 않아도 작동하는 부분에는 문제는 없는지 물어본다.
blogRouter.delete('/:id', async (req, res) => {
    try {
        res.json(await Blog.findByIdAndDelete(req.params.id)); // id 를 브라우저에서 사용자가 어떻게 전달할 수 있는지 물어본다. 그리고 findByIdAndRemove에 대해서도 물어본다.
    } catch {
        res.status(400).json(error);
    }
});

// BLOG update route
blogRouter.put('/:id', async (req, res) => {
    try {
        res.json(
            await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }) // findByIdAndUpdate 의 파라미터에 대해서 물어본다.
        );                 // 어떻게 같은 오브젝트 안에 키값인 아이디를 불러왔는데 다른 키값들을 변경할 수 있는지 물어본다.
    } catch {
        res.status(400).json(error);
    }
});

module.exports = blogRouter;