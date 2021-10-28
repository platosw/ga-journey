// dependencies
require('dotenv').config();
const express = require('express');
// create application object
const app = express();
// import mongoose
const mongoose = require('mongoose');
// import middleware
const cors = require('cors');
const morgan = require('morgan');

// DATABASE connection
// establish connection
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
// connection events
mongoose.connection
    .on('close', () => console.log('It is disconnected from MongoDB'))
    .on('open', () => console.log('It is connected to MongoDB'))
    .on('error', (error) => console.log(error));

// models 스키마에 대해서 다시 물어볼 것
const BlogSchema = new mongoose.Schema({
    // 선생님께 이 블로그를 생성한 유저정보를 어떻게 남겨야 하는지 물어볼 것.
    title: String,
    text: String,
    img: String,
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

//MIDDLEWARE
app.use(cors());// to prevent errors, open access to all origins
app.use(morgan('dev'));
app.use(express.json()); // parse json bodies

// routes  ======>> 왜 INDUCES 순서를 따르지 핞는건지 물어보기
// testing
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// BLOG Index route
app.get('/blog', async (req, res) => {
    try {
        // send all blog
        res.json(await Blog.find({})); //어떻게 여기에서는 express.json() 대신 res.json() 을 쓸 수 있는지 질문하기
    } catch (error) { // 여기에서 에러는 파라미터인데 어디서 에러 데이터가 이곳으로 올 수 있는지 물어보기
        // send error
        res.status(400).json(error); // 각각의 구조에 대해서 물어보기
    }
});

// BLOG Create route
app.post('/blog', async (req, res) => {
    try {
        // send all blog
        res.json(await Blog.create(req.body));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

// BLOG delete route ====>> 비동기를 사용하지 않아도 작동하는 부분에는 문제는 없는지 물어본다.
app.delete('/blog/:id', async (req, res) => {
    try {
        res.json(await Blog.findByIdAndDelete(req.params.id)); // id 를 브라우저에서 사용자가 어떻게 전달할 수 있는지 물어본다. 그리고 findByIdAndRemove에 대해서도 물어본다.
    } catch {
        res.status(400).json(error);
    }
});

// BLOG update route
app.put('/blog/:id', async (req, res) => {
    try {
        res.json(
            await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }) // findByIdAndUpdate 의 파라미터에 대해서 물어본다.
        );
    } catch {
        res.status(400).json(error);
    }
});

// listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`It's connected on port: ${PORT}`);
});