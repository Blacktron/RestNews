'use strict';

import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: 'Date is required',

    },
    title: {
        type: String,
        required: 'Title is required',
        minlength: 5,
        maxlength: 150
    },
    shortDescription: {
        type: String,
        required: 'Short description is required',
        minLength: 5,
        maxLength: 400,
    },
    text: {
        type: String,
        required: 'Text is required',
        minLength: 5,
        maxLength: 1000
    }
});

export default mongoose.model('News', newsSchema);