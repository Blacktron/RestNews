'use strict';

import News from '../models/news.js';
import { prepareSortQuery, prepareFilterQuery } from '../services/news.js';

export async function getNews(ctx) {
    try {
        let news;

        if (ctx.query.sort) {
            const sortObj = await prepareSortQuery(ctx);
            news = await News.find().sort(sortObj);
        } else if (ctx.query.filter) {
            const filterObj = await prepareFilterQuery(ctx);

            if (filterObj.error && filterObj.error === true) {
                ctx.status = 400;
                ctx.body = {
                    'error': filterObj.errorMessage
                }

                return;
            } else {
                news = await News.find(filterObj);
            }
        } else {
            news = await News.find();
        }

        ctx.status = 200;
        ctx.body = news;
    } catch (e) {
        console.log(`Failed to get news. Message: ${e.message}`);
        ctx.status = 500;
        ctx.body = {
            'error': `Failed to get news. Message: ${e.message}`
        }
    }
}

export async function createNews(ctx) {
    try {
        const news = new News(ctx.request.body);
        await news.save();
        ctx.status = 201;
        ctx.body = {
            'message': 'Successfully created a news entity',
        }
    } catch (e) {
        console.log(`Failed to save entity to MongoDB. Message: ${e.message}`);
        ctx.status = 500;
        ctx.body = {
            'error': `Failed to save entity to MongoDB. Message: ${e.message}`,
        }
    }

}

export async function deleteNews(ctx) {
    try {
        const query = { _id: ctx.params.id };
        await News.deleteOne(query);
        ctx.status = 200;
        ctx.body = {
            'message': `Successfully deleted news entity with id=${ctx.params.id}`,
        }
    } catch (e) {
        console.log(`Failed to delete entity. Message: ${e.message}`);
        ctx.status = 500;
        ctx.body = {
            'error': `Failed to delete entity. Message: ${e.message}`,
        }
    }
}

export async function updateNews(ctx) {
    try {
        const query = { _id: ctx.params.id };
        const update = ctx.request.body;
        await News.updateOne(query, update);
        ctx.status = 200;
        ctx.body = {
            'message': `Successfully updated entity with id ${ctx.params.id}`
        }
    } catch (e) {
        console.log(`Failed to update entity. Message: ${e.message}`);
        ctx.status = 500;
        ctx.body = {
            'error': `Failed to update entity. Message: ${e.message}`,
        }
    }
}
