#!/usr/bin/env node
module.exports = function create_migration_files(path_to_dir, env) {
	var fs  				 = require('fs');
	var _   				 = require('../node_modules/underscore');
	var YAML 				 =	require('yamljs');
	var ejs					 = require('ejs');
    
	var i 					 = 0;
			
	if (env == "production") {
		read_dir = path_to_dir[0]
	} else if (env == "staging") {
		read_dir = path_to_dir[1]
	}


	fs.readdir(read_dir, function(err, files) {
		_.each(files, function(read_file) {

			if (read_file.match(/log/gm)) {
	
				var ascii_data   = fs.readFileSync(read_dir + "/" + read_file , 'ascii');	
				var entries 	 	 = _.compact( _.map( ascii_data.match(/^Started[\s\S]+?(?=^Started)/mg), function(matched){
					if( /Completed\s[45]/.test(matched) ){
						// 正規表現の先読み(?<=pattern)が使えない？
						var entry = matched
						var timestamp = matched.match(/[0-9]{4}-([0-9]{2}-?){2}\s([0-9]{2}:?){3}\s\+[0-9]{4}/mg)
						var error_status = matched.match(/(Completed\s)[0-9]{3}/gm)[0].slice(10)

						entries = [entry, timestamp, error_status]
						return entries

					} else {

						return null;

					}
				}))
				
				data = fs.readFileSync('migration_template_exception.ejs', 'ascii');									

				
				renderd = ejs.render(data, {entries: entries, env: env});

				if (read_file.match(/[0-9]{8}/)) {
					fs.appendFileSync("db/" + env + "-" + read_file.slice(-8) + ".erb", renderd);
					console.log(renderd);
				}
			}				
		})
	})	
}
