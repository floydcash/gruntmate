
var worker = require("./lib/worker/worker").worker;

if(!worker){

	var path = require("path");
	
	var project_path = process.cwd();
	var exec_path = path.dirname(process.argv[1]);
	var exec_param = process.argv[2];
	
	process.chdir(exec_path);
	
	global.project_path = project_path;
	global.exec_path = exec_path;
	global.exec_param = exec_param || "default";
	
	startGrunt();
}
else{
	
	worker.onmessage = function (msg) {
 
	  global.project_path = msg.path;
	  global.exec_path = msg.exec_path;
	  global.exec_param = msg.exec_param || "default";
	 
	  startGrunt();
	};
}


function startGrunt(){
	
	// Especially badass external libs.
	var findup = require('findup-sync');
	var resolve = require('resolve').sync;

	// Internal libs.
	var options = require('./lib/grunt/cli').options;
	var completion = require('./lib/grunt/completion');
	var info = require('./lib/grunt/info');
	var path = require('path');

	var basedir = process.cwd();
	var gruntpath;

	// Do stuff based on CLI options.
	if ('completion' in options) {
	  completion.print(options.completion);
	} else if (options.version) {
	  info.version();
	} else if (options.gruntfile) {
	  basedir = path.resolve(path.dirname(options.gruntfile));
	}

	try {
	  gruntpath = resolve('grunt', {basedir: basedir});
	} catch (ex) {
	  gruntpath = findup('lib/grunt.js');
	  // No grunt install found!
	  if (!gruntpath) {
		if (options.version) { process.exit(); }
		if (options.help) { info.help(); }
		info.fatal('Unable to find local grunt.', 99);
	  }
	}

	var grunt= require(gruntpath);

	grunt.cli();
}

//console.gruntlog = function(msg){
	
	//msg = msg.replace(/\[\d+m/gi,"");
	
	//worker.postMessage({
		//msg: msg
	//});
//}