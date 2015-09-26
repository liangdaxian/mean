'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Post = mongoose.model('Post'),
	_ = require('lodash');

/**
 * Create a post
 */
exports.create = function(req, res) {
	var post = new Post(req.body);
	post.user = req.user;

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.post);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var post = req.post;

	post = _.extend(post, req.body);

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var post = req.post;

	post.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Post.find().sort('-created').populate('author', 'displayName').exec(function(err, posts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(posts);
		}
	});
};

/**
 * Article middleware
 */
exports.postByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Post is invalid'
		});
	}

	Post.findById(id).populate('author', 'displayName').exec(function(err, post) {
		if (err) return next(err);
		if (!post) {
			return res.status(404).send({
				message: 'Post not found'
			});
		}
		req.post = post;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	//if (req.article.user.id !== req.user.id) {
	//	return res.status(403).send({
	//		message: 'User is not authorized'
	//	});
	//}
	next();
};
