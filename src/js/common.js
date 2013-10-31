
function $(id){return typeof id=="string"?document.getElementById(id):id;}

process.on('uncaughtException', function(err) {

	//process.stdout.write(err);

	console.log(err);
});

process.on("exit",function(code){

	Common.saveProjectConfig();
});

console.tolog = function(msg,p_num){

	console.log(msg);
	
	msg = msg.toString();
	
	if(msg.length < 1)return false;
	
	msg = msg.split(/\n/gi);

	var log_dom = $("js_right_ctn_"+p_num).lastChild;
	
	for(var i=0;i<msg.length;i++){
	
		var span = document.createElement("span");
		span.innerHTML = html.encode(msg[i]);
		
		if(msg[i].indexOf("Fatal error:")>-1){
			span.className = "err";
		}
		else if(msg[i].indexOf("Warning:")>-1){
			span.className = "warn";
		}
		else if(msg[i].indexOf("Done")>-1 || msg[i].indexOf("Running")>-1){
			span.className = "ok";
		}
		
		log_dom.appendChild(span);
	}
	
	log_dom.scrollTop = log_dom.scrollHeight;
}

var $ProjectList = {};
var $ProjectHash = {};
var $CurrentProject = "";

var Common = function(){

	var $execPath = process.execPath.indexOf("gruntmate")>-1?process.execPath:process.cwd();

	//保存配置
	function saveProjectConfig(){

		var config = JSON.stringify($ProjectList);

		var fs = require("fs");
		var path = require("path");

		var execPath = path.join(path.dirname($execPath),"project.json");

		fs.writeFileSync(execPath, config);
	}

	function loadProjectConfig(cb){

				//读取配置
		var fs = require("fs");
		var path = require("path");

		var execPath = path.join(path.dirname($execPath),"project.json");

		fs.readFile(execPath, function (err, data) {
		  if (err){
		  		console.log(err);
		  		return false;
		  	}
		  
		  var content = data.toString();
		  content = JSON.parse(content);

		  cb && cb(content);
		});
	}

	function createProjectNum(){

		var num = 0;

		for(var name in $ProjectList){

			num = name;
		}
		return parseInt(num,10)+1;
	}

	return {
		execPath : $execPath,
		saveProjectConfig :saveProjectConfig,
		loadProjectConfig :loadProjectConfig,
		createProjectNum : createProjectNum
	};

}();