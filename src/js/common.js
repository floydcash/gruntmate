
function $(id){return typeof id=="string"?document.getElementById(id):id;}

process.on('uncaughtException', function(err) {

	//process.stdout.write(err);

	console.log(err);
});

process.on("exit",function(code){

	Common.saveProjectConfig();
});

console.tolog = function(msg,p_num){

	//console.log(msg);
	
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

window.alert = function(msg){
	
	var box = $("js_msg_alert");
	var bg = $("js_msg_bg");
	
	if(!box){
		
		box = document.createElement("div");
		box.className = "msg-box";
		box.id = "js_msg_alert";
		
		box.innerHTML = '<div class="head"><span>提示</span><a href="javascript:void(0)" class="close" title="关闭">&times;</a></div>\
						<div class="ctn">test</div>';
		
		bg = document.createElement("div");
		bg.className = "msg-bg";
		bg.id = "js_msg_bg";
		
		document.body.appendChild(bg);
		document.body.appendChild(box);
		
		box.querySelector(".close").onclick = function(){
			
			box.style.display = "none";
			bg.style.display = "none";
			
			document.body.removeChild(box);
			document.body.removeChild(bg);
		}
	}
	
	box.querySelector(".ctn").innerHTML = msg;
	
	box.style.display = "block";
	bg.style.display = "block";
}

window.confirm = function(msg,cb){
	
	var box = $("js_msg_alert");
	var bg = $("js_msg_bg");
	
	if(!box){
		
		box = document.createElement("div");
		box.className = "msg-box";
		box.id = "js_msg_alert";
		
		box.innerHTML = '<div class="head"><span>提示</span><a href="javascript:void(0)" class="close" title="关闭">&times;</a></div>\
						<div class="ctn"></div><div class="btn"><button class="confirm">确定</button><button class="cancel">取消</button></div>';
		
		bg = document.createElement("div");
		bg.className = "msg-bg";
		bg.id = "js_msg_bg";
		
		document.body.appendChild(bg);
		document.body.appendChild(box);
		
		box.querySelector(".close").onclick = box.querySelector(".cancel").onclick  = function(){
			
			box.style.display = "none";
			bg.style.display = "none";
			
			document.body.removeChild(box);
			document.body.removeChild(bg);
		}
		
		box.querySelector(".confirm").onclick = function(){
			
			box.style.display = "none";
			bg.style.display = "none";
			
			document.body.removeChild(box);
			document.body.removeChild(bg);
			
			cb && cb();
		}
	}
	
	box.querySelector(".ctn").innerHTML = msg;
	
	box.style.display = "block";
	bg.style.display = "block";
}

var $ProjectList = {};
var $ProjectHash = {};
var $CurrentProject = "";

var Common = function(){
	
	var $path = require("path");
	
	var $execPath = process.execPath.indexOf("gruntmate")>-1?$path.dirname(process.execPath):$path.dirname(process.cwd());

	//保存配置
	function saveProjectConfig(){

		var config = JSON.stringify($ProjectList);

		var fs = require("fs");
		var path = require("path");

		var execPath = path.join($execPath,"project.json");

		fs.writeFileSync(execPath, config);
	}

	function loadProjectConfig(cb){

				//读取配置
		var fs = require("fs");
		var path = require("path");

		var execPath = path.join($execPath,"project.json");

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