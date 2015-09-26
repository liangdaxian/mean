/**
 * Created by jiliang on 6/10/15.
 */
'use strict';

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
