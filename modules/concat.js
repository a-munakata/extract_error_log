// CONCAT
function concat(fileName) {

	// MODULE IMPORT
	var fs 						= require('fs');
	var sugar					= require('sugar');

	var path 					= __dirname + "/../";		
	var date 					= Date.create('1 days ago').format('{yyyy}{MM}{dd}');	

	var pathToDir 		= date + "/" + fileName;
	var logFilePattern= fileName + ".log-";
	var readFile 			= fs.readdirSync(pathToDir);
	
	for (var i = 0; i < readFile.length ; i ++) {
		if (readFile[i].match(logFilePattern) != null) {
			data = fs.readFileSync(path + "/" + pathToDir + "/" + readFile[i], "ascii");
			fs.appendFileSync(path + "/" + date + "/" + fileName + "/export/concat-" + fileName + ".log-" + date, data);
		}
	}
}

module.exports = concat;