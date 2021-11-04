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


//MIDDLEWARE
app.use(cors());// to prevent errors, open access to all origins
app.use(morgan('dev'));
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: false }));

// routes  ======>> 왜 INDUCES 순서를 따르지 핞는건지 물어보기
const blogController = require('./controllers/blog.js');

// testing
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// controllers
app.use('/blog', blogController);

// listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`It's connected on port: ${PORT}`);
});