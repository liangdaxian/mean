/**
 * Created by jiliang on 6/9/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Post Schema
 */
var CommentSchema = new Schema({
	postId: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		default: '',
		trim: true,
		required: 'Comment cannot be blank'
	},
	author: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Comment', CommentSchema);
