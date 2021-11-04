const mongoose = require('mongoose');

// models 스키마에 대해서 다시 물어볼 것
const BlogSchema = new mongoose.Schema({
    // 선생님께 이 블로그를 생성한 유저정보를 어떻게 남겨야 하는지 물어볼 것.
    title: String,
    text: String,
    img: String,
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;