'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../errors.server.controller'),
	serviceMgr = require('../../libs/services/serviceManager');

/**
 * service methods
 */
exports.startServices = function(req, res) {
	serviceMgr.start(function(){
		res.json({'status':'start done'});
	});

};

/**
 * stop services
 */
exports.stopServices = function(req, res) {

	serviceMgr.start(function(){
		res.json({'status':'stop done'});
	});
};

/**
 * restart service
 */
exports.restartServices = function(req, res) {
	this.startServices(req,res);
	this.stopServices(req,res);
};
