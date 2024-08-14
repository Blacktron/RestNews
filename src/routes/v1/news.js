'use strict';

import Router from 'koa-router';

import { getNews, createNews, deleteNews, updateNews } from '../../repositories/news.js';
import { validateRequest } from '../../validators/requestValidator.js';

const router = new Router({
    prefix: '/v1/news'
});

router.get('/', async (ctx, next) => {
    await getNews(ctx);

    next();
});

router.post('/', async (ctx, next) => {
    const isRequestValid = await validateRequest(ctx);

    if (isRequestValid) {
        await createNews(ctx);
    } else {
        ctx.status = 400;
        ctx.body = {
            'error': 'Something went wrong! Please provide value for date, title, short description, and text.'
        }
    }

    next();
});

router.delete('/:id', async (ctx, next) => {
    await deleteNews(ctx);

    next();
});

router.put('/:id', async (ctx, next) => {
    const isRequestValid = await validateRequest(ctx);

    if (isRequestValid) {
        await updateNews(ctx);
    } else {
        ctx.status = 400;
        ctx.body = {
            'error': 'Something went wrong! Please provide value for date, title, short description, and text.'
        }
    }

    next();
});

export default router;
