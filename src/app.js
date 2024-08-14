'use strict';

import Koa from 'koa';
import { koaBody } from 'koa-body';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import newsRouter from './routes/v1/news.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected'));

const app = new Koa();

// Middleware
app.use(koaBody());

// Routes
app.use(newsRouter.routes());

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on port ${process.env.SERVER_PORT}`);
});
