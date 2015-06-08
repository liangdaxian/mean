/**
 * Created by jiliang on 6/4/15.
 */

'use strict';

var events = require('events'),
	util = require('util');

var TimerJob = require('timer-jobs');
var phantom = require('phantom');
var seedsConfig = require('./seedConfig');

function URLRetriverService() {

	this.urlRetriveTimer = null;

	return this;
}

if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function(suffix) {
		return this.indexOf(suffix) === 0;
	};
}

if (typeof String.prototype.containsString !== 'function') {
	String.prototype.containsString = function(suffix) {
		return this.indexOf(suffix) !== -1;
	};
}

/**
 * Starts the interval if it hasn't already
 */

function _retriveURLFromMain() {
	return seedsConfig.standurl;
}

function _retriveURLFromCaoliula() {
	return seedsConfig.caoliula;
}

function _retriveURLFromYahooGroups() {
	return seedsConfig.yahooGroupUrl;
}

function _rewriteConfigFile(){

}

function retriveURL(cb) {

	// only cases about here:
	var Crawler = require("crawler");
	var urllib = require('url');
	var foundAvailableLink = false;

	console.log('start the crawler for : ' + _retriveURLFromMain());
	console.log('start the crawler for : ' + _retriveURLFromCaoliula());
	console.log('start the crawler for : ' + _retriveURLFromYahooGroups());

	var c = new Crawler({
		maxConnections : 10,
		skipDuplicates:true,
		// This will be called for each crawled page
		callback : function (error, result, $) {
			// $ is Cheerio by default
			//a lean implementation of core jQuery designed specifically for the server

			console.log('webpage resourse of page title: '+ $('head title').text());

			if($('head title') && $('head title').text().containsString('- powered by phpwind.net')){

				console.warn('*********** finding websites and start feeding progress ***********');
				//seedsConfig.standurl = toQueueUrl;
				foundAvailableLink = true;
				cb('done!!');

			}else{

				$('a').each(function(index, a) {

					// restrict branches for <a>, we only cares about
					// 1. direct url, ends with index.php 2.groups.yahoo.com
					var hrefLink = $(a).attr('href');
					if(!hrefLink)return;

					if(hrefLink.endsWith('index.php')){
						console.log('find '+ hrefLink + ' and start the crawler for : ' + hrefLink);
						c.queue(hrefLink);
					}

					if(hrefLink.startsWith('https://groups.yahoo.com/neo/groups/caoliula')){
						console.log('find '+ hrefLink + ' and start the crawler for : ' + hrefLink);
						c.queue(hrefLink);
					}

					if(hrefLink.startsWith('http://www.caoliula.info')){
						console.log('find '+ hrefLink + ' and start the crawler for : ' + hrefLink);
						c.queue(hrefLink);
					}

					if(hrefLink.startsWith('http://www.caoliula.org')){
						console.log('find '+ hrefLink + ' and start the crawler for : ' + hrefLink);
						c.queue(hrefLink);
					}

					if(hrefLink.startsWith('http://www.caoliu.la/url/')){
						console.log('find '+ hrefLink + ' and start the crawler for : ' + hrefLink);
						c.queue(hrefLink);
					}
				});
			}
		}
	});

	c.queue(_retriveURLFromMain());
	c.queue(_retriveURLFromCaoliula());
	c.queue(_retriveURLFromYahooGroups());

	setTimeout(function(){
		if(!foundAvailableLink){
			cb();
		}
	},10000);

}

URLRetriverService.prototype.start = function (cb) {

	//TODO: get interval from config
	this.urlRetriveTimer = new TimerJob({
		blocking: false,
		interval: 5000,
		immediate: true,
		ignoreErrors: true,
		autoStart: false
	}, function (done) {

		var phantom = require('phantom');
		phantom.create(function (ph) {
			ph.createPage(function (page) {
				page.open(_retriveURLFromMain(), function (status) {

					if (status !== 'success') {
						console.log('Unable to access '+ _retriveURLFromMain() +', retriving ...');
						retriveURL(function(){
							done();
						});
						ph.exit();
					} else {
						page.evaluate(function () { return document.title; }, function (result) {
							console.log('Page title is ' + result);
							if(result.containsString('error') || result.containsString('Error')){
								console.log('Page url '+ _retriveURLFromMain() + ' is not valid any more,retriving ... ');
								retriveURL(function(){
									done();
								});
							}
							ph.exit();
						});
					}
				});
			});
		});
	});

	this.urlRetriveTimer.start();
};

/**
 * Stops the interval if it hasn't already
 */
URLRetriverService.prototype.stop = function (cb) {

	if (this.urlRetriveTimer)
		this.urlRetriveTimer.stop();
};


// BAM! One export
module.exports = function (cb) {

	cb('Staring the timer to retrive url ...');

	var services = new URLRetriverService();
	services.start();

};



