#!/usr/bin/env node

module.exports 	 = function path_factory(usage) {
	var _ 		  	 = require ('underscore');
	var path       = require ('path');
	var sugar			 = require ('sugar');
	var fs 				 = require ('fs');

	var path_array 			= [];
	var formated_date		= Date.create().format('{yyyy}{MM}');
	var base_path 			= path.resolve(__dirname, "..");
	var envs     	 			= ["production", "staging"];

	var nginx_path			= "/usr/local/var/www/"

	var path_to_dir 		= _.map(envs, function(env) {
		var path_to_backup  = base_path + "/backup/" + env + "/" + formated_date;
		// var path_to_report  = base_path + "/report/" + env + "/" + formated_date;
		var path_to_report = "/usr/local/var/www/" + env + "/" + formated_date;
		

		var arr_backup_files = _.compact(_.map(fs.readdirSync(path_to_backup), function (file) {
			if (file.match(/(log-[0-9]{8}$)/)) {
					return path_to_backup + "/" + file
				} else {
					return null
				}
		}));
	
		

		var arr_report_files = _.map(arr_backup_files, function(file) {

			var day_before = Date.create(file.slice(-8)).addDays(-1).format("{dd}");
			
			return (path_to_report + "/" + day_before + "-" + file.slice(-2)) +  ".log"

		})
			
		var path_to_files = [arr_backup_files, arr_report_files]
		
		return eval("path_to_" + usage)

		}
	)

	return path_to_dir
}
