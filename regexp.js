#!/usr/bin/env node
// 
//	copy.sh
// 
//////////////////////////////////////////////////////////// 

var getError = require('./modules/getError');
var concat = require('./modules/concat');

var whichFile = ['production', 'staging'];
for (var i = 0; i < whichFile.length; i ++) {
	concat(whichFile[i]);
	getError(whichFile[i]);
}



