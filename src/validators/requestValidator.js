'use strict';

export async function validateRequest(ctx) {
    let isRequestValid = true;

    if (!ctx.request.body.date ||
        !ctx.request.body.title ||
        !ctx.request.body.shortDescription ||
        !ctx.request.body.text) {
        isRequestValid = false;
    }

    return isRequestValid;
};
