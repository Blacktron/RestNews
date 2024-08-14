'use strict';

import mongoose from 'mongoose';

const loggingSchema = new mongoose.Schema({
    date: Date,
    endpoint: String,
    httpMethod: String,
    headers: Object,
    params: Object,
    statusCode: Number,
    error: String,
    responseTime: String
});

export default mongoose.model('Logs', loggingSchema, 'logs');