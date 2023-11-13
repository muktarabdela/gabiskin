import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/db.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({ message: 'hello world' });
})

// users

import authenticateToken from './middleware/authenticateToken.js';
import userRouter from './routes/userRoute.js';
app.use('/api/users', userRouter);

// stickers
import stickersRouter from './routes/stickersRouter.js';
app.use('/api/stickers', stickersRouter);

import paymentRouter from "./routes/paymentRouter.js"
app.use('/api/payment', paymentRouter)

// server
const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        connectDB(process.env.DBURL);
        app.listen(port, () => console.log(`http://localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
}
startServer();