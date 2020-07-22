"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    user: {
        // this is the reference to specific user _id
        type: Schema.Types.ObjectId,
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
            },
        },
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;
