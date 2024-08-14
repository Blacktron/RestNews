'use strict';

import Koa from 'koa';
import { koaBody } from 'koa-body';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import newsRouter from './routes/v1/news.js';
import { logRequest } from './middlewares/requestLogging.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected'));

const app = new Koa();

// Middleware
app.use(koaBody());
app.use(logRequest);

// Routes
app.use(newsRouter.routes());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
