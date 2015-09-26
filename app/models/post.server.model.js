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
var PostSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	author: {
		type: Schema.ObjectId,
		ref: 'Author'
	},
	thumbnail: {
		type: String,
		default: '',
		trim: true
	},
	comments: {
		type:Schema.ObjectId,
		ref: 'Comments'
	}
});

mongoose.model('Post', PostSchema);
