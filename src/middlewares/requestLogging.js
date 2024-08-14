'use strict';

import Logs from '../models/logging.js';

export async function logRequest(ctx, next) {
    const startTime = Date.now();
    await next();

    const sagaData = {
        date: new Date(),
        endpoint: ctx.request.url,
        httpMethod: ctx.request.method,
        headers: ctx.request.headers,
        params: ctx.request.query,
        statusCode: 0,
        error: null,
        responseTime: null
    };

    ctx.request.sagaData = sagaData;

    ctx.res.on('finish', async () => {
        sagaData.statusCode = ctx.status;
        sagaData.error = (ctx.status === 500 || ctx.status === 400) ? ctx.body.error : null;
        sagaData.responseTime = `${Date.now() - startTime}ms`;
        const logs = new Logs(sagaData);
        await logs.save();
    });
}