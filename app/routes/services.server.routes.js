'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	services = require('../../app/controllers/services/services.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/service/start')
		.get(services.startServices);

	app.route('/service/stop')
		.get(services.stopServices);

	app.route('/service/restart')
		.get(services.restartServices);
};
