'use strict';

import News from '../models/news.js';

export async function getNews(ctx) {
    try {
        let news;

        if (ctx.query.sort) {
            const sortingFields = ctx.query.sort.split(',');
            const sortObj = {};

            sortingFields.forEach((entry) => {
                sortObj[entry] = 'asc'
            });

            news = await News.find().sort(sortObj);
        } else if (ctx.query.filter) {
            const filterFields = ctx.query.filter.split(',');
            const filterObj = {};

            for (const filterField of filterFields) {
                if (filterField === 'date') {
                    const filterStartDate = new Date(ctx.query.startDate);
                    const filterEndDate = new Date(ctx.query.endDate);
                    console.log(`filterEndDate=${filterEndDate}`);

                    filterObj[filterField] = {
                        $gte: filterStartDate,
                        ...(ctx.query.endDate && { $lt: filterEndDate })
                    }
                }

                if (filterField === 'title') {
                    filterObj[filterField] = { $regex: ctx.query.searchTitle, $options: 'i' }
                }
            }

            news = await News.find(filterObj);
        } else {
            news = await News.find();
        }

        ctx.status = 200;
        ctx.body = news;
    } catch (e) {
        console.log(`Failed to get news. Message: ${e.message}`);
        ctx.status = 500;
        ctx.body = {
            'message': `Failed to get news. Message: ${e.message}`
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
            'message': `Failed to save entity to MongoDB. Message: ${e.message}`,
        }
    }

}

export async function deleteNews(ctx) {
    try {
        const query = { _id: ctx.params.id };
        await News.deleteOne(query);
        ctx.status = 204;
    } catch (e) {
        console.log(`Failed to delete entity. Message: ${e.message}`);
        ctx.status = 500;
        ctx.body = {
            'message': `Failed to delete entity. Message: ${e.message}`,
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
            'message': `Failed to update entity. Message: ${e.message}`,
        }
    }
}
