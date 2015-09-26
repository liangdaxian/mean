'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	post = require('../../app/controllers/post.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/post')
		.get(post.list);

	app.route('/post/:postId')
		.get(post.read);

	// Finish by binding the article middleware
	app.param('postId', post.postByID);
};
