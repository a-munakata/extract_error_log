// GET ERROR LOGS, ADD LINE
var getError = function(fileName) {
	
	// MODULE IMPORT
	var fs 						= require('fs');
	var sugar 				= require('sugar');

	var date 					= Date.create('1 days ago').format('{yyyy}{MM}{dd}');
	var regexErr 			= /^Started.*?\n^Processing.*?\n(^\s.*?\n)+?Completed\s[400|500].*?\n\n^\n?(^.+?\n)+(^\n)/mg;
	var path 					= __dirname + "/../";		
	var readFileName 	= path + "/" + date + "/" + fileName + "/export/concat-" + fileName + ".log-" + date;
	var writeFileName = path + "/" + date + "/" + fileName + "/export/error-" + fileName + ".log-" + date;	
	var data 					= fs.readFileSync (readFileName, 'ascii');
	var matchedData 	= data.match(regexErr);

	for (var j = 0; j < matchedData.length; j ++) {
		str 				= matchedData[j];
		var newData = str.replace("/^Started/g", "\n\n\n#######################################################################################################\n\n\nStarted");
		fs.appendFileSync(writeFileName, newData);
	}
}	

module.exports = getError;