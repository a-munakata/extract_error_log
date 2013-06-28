#!/usr/bin/env node
module.exports = function backup_logs (path_from_factory) {

	var gunzip_and_unlink = require ('./lib/gunzip_and_unlink'),
			secure_copy				= require ('./lib/secure_copy'),
			move_files				= require ('./lib/move_files'),
			validate_time 		= require ('./lib/validate_time')

	var $ 								= require ('jquery'),
			dfd 							= $.Deferred()
			
		dfd
			.then(function(arg) {		
				setTimeout(function() {
					secure_copy(path_from_factory)
				}, 0)																	
				console.log("secure_copy Done")
			})
			.then(function(arg) {
				setTimeout(function() {
					gunzip_and_unlink(path_from_factory)
				}, 2000)				
				console.log("gunzip_and_unlink Done")
			})
			.then(function(arg) {					
				setTimeout(function() {
					move_files(path_from_factory)
				}, 4000)				
				console.log("move_files Done")
			})
			.then(function(arg) {
				setTimeout(function() {
					validate_time(path_from_factory)
				}, 5000)				
				console.log("validate_time Done")
			})
									
	  dfd.resolve();


}

