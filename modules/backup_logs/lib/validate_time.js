module.exports = function (path_to_dir) {
	var fs 		= require ('fs');
	var _ 		= require ('underscore');
	var sugar = require('sugar');
	
	_.each(path_to_dir, function(path_to_date_dir) {
		fs.readdir(path_to_date_dir, function(err, files) {

			if (err) { console.log (err) }
				_.each(files, function(file) {
					if (file.match(/(log-[0-9]{8})/)) {

						data = fs.readFileSync(path_to_date_dir + "/" + file, "ascii")

    				var matched_data = _.compact( _.map( data.match(/^Started[\s\S]+?(?=^Started)/mg), function(matched){
						
							var occurred_date = matched.match(/[0-9]{4}-([0-9]{2}-?){2}\s([0-9]{2}:?){3}\s\+[0-9]{4}/mg)[0];	
							var created_date = Date.create(occurred_date).format('{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {tz}');				    
							
							var replaced_date = matched.replace(occurred_date, created_date);
							
					    return replaced_date;
					    
						}) );		

						fs.writeFileSync(path_to_date_dir + "/" + file, matched_data.join(""), "ascii")
					}
				})
			})
		})	
}
