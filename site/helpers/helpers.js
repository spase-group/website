'use strict';

const path = require('path');
const fs = require('fs');

// Determine class for released versions
// Use "triple-stash" like this {{{expression}}} if you don't want to escape a value.
module.exports.color = function (str)  {  
	if(str == 'Released.') { return 'class="released"'; }
	return ""; 
};

// Check if two values match
module.exports.isMatch = function (str1, str2)  {  
	return (str1 == str2);
};

// Sort an array of objects based on the value of a field.
// If 'reverse' is true, the array is sorted in descending order.
module.exports.sort = function (array, field, reverse)  {  
	var factor = 0;
	if(reverse) factor = -1;

	return array.sort(function(a, b) {
		if(typeof a[field] === "string") {
			return (a[field].localeCompare(b[field]) * factor);
		} else {
			if (a[field] < b[field]) return -1 * factor;
			if (a[field] > b[field]) return 1 * factor;
			return 0;
		}
	});
};

// Convert a text into a set of list elements. 
// Each item is delimited by a semi-colon (;)
// Use "triple-stash" like this {{{expression}}} if you don't want to escape a value.
module.exports.makeList = function (text)  { 
    var response = "";
    var list = text.split(";");
	
	for(var i = 0; i < list.length; i++) {
		response += "<li>" + list[i].trim() + "</li>";
	}
	
	return response;
};


// Convert all dots (.) to underscore (_)
module.exports.flattenDot = function (text)  {
	return text.replace(/\./g, '_');
};

// Return the current working directory of the process
module.exports.cwd = function ()  {
	return process.cwd();
};

// Return the version number part of a file name (string).
module.exports.getFileVersion = function(name, prefix, ext) {
	var version = path.basename(name);
	if(version.endsWith(ext)) { version = version.substring(0, version.length - ext.length); }
	if(version.startsWith(prefix)) { version = version.substring(prefix.length); }
	
	return version;
};


// Return the version number part of a file name (string).
module.exports.getFileList = function(folder, pattern, descending, subfolder) {
	var files = fs.readdirSync(folder);
	
	if(pattern) {
		var results = [];
		var regex = new RegExp(pattern);
		for(var i = 0; i < files.length; i++) {
			if( files[i].match(regex) ) { results.push(files[i]); }
		}
		files = results;
	}
	
	if(descending) {
		files = files.reverse();
    } else {
		files = files.sort();
	}
	
	return files;
};