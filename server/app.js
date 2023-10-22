const { json } = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const connectDB = require('./config/db');
connectDB();
// database

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));

// routes
// users
const userRouter = require('./routes/userRoute');
app.use('/api/users', userRouter);
// stickers
const stickersRouter = require('./routes/stickersRouter');
app.use('/api/stickers', stickersRouter);

// server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
