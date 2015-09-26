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
var AuthorSchema = new Schema({
	registedTime: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	headshot: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Author', AuthorSchema);
