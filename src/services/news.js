'use strict';

export async function prepareSortQuery(ctx) {
    const sortingFields = ctx.query.sort.split(',');
    const sortObj = {};

    sortingFields.forEach((entry) => {
        sortObj[entry] = (ctx.query.orderBy) ? ctx.query.orderBy.toLowerCase() : 'asc'
    });

    return sortObj;
}

export async function prepareFilterQuery(ctx) {
    const filterFields = ctx.query.filter.split(',');
    const filterObj = {};

    for (const filterField of filterFields) {
        if (filterField === 'date') {
            if (ctx.query.endDate && !ctx.query.startDate) {
                filterObj.error = true;
                filterObj.errorMessage = 'Please provide a value for startDate query parameter';

                return filterObj;
            }

            const filterStartDate = new Date(ctx.query.startDate);
            const filterEndDate = new Date(ctx.query.endDate);

            filterObj[filterField] = {
                $gte: filterStartDate,
                ...(ctx.query.endDate && { $lt: filterEndDate })
            }
        }

        if (filterField === 'title') {
            if (!ctx.query.searchTitle) {
                filterObj.error = true;
                filterObj.errorMessage = 'Please provide a value for searchTitle query parameter';

                return filterObj;
            }

            filterObj[filterField] = { $regex: ctx.query.searchTitle, $options: 'i' }
        }
    }

    return filterObj;
}
