#!/usr/bin/env node
module.exports = function decoration_data(data) {	
	var ejs 	 = require ('ejs');
	var fs  	 = require ('fs');
	
	var _   			= require('underscore');

	var errors = _.compact( _.map( data.match(/^Started[\s\S]+?(?=^Started)/mg), function(matched){

      return matched;

	}) );
		

	var data 		= fs.readFileSync('modules/export_report/decorate_data.ejs', 'ascii');
	var renderd = ejs.render(data, { errors: errors });	
  	
	return renderd;

	
}
