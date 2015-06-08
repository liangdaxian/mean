/**
 * Created by jiliang on 6/4/15.
 */

'use strict';

var ServiceInstance = {};
var FARM_OPTIONS = {
	maxConcurrentWorkers: require('os').cpus().length,
	maxCallsPerWorker: Infinity,
	maxConcurrentCallsPerWorker: 1
};

var workerFarm = require('worker-farm'),
	workers = workerFarm(require.resolve('./URLRetriverService.js'));

ServiceInstance.start = function () {
	console.log('Staring the worker-farm...');

	var service = require(require.resolve('./URLRetriverService.js'));
	service(function(message){
		console.log(message);
	});
};

//todo: add ends
//workerFarm.end(workers)

module.exports = ServiceInstance;
