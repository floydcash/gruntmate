
var NPM = function(){
	
	var $container = $("js_npm_container");
	var $list = $("js_npm_list");
	
	var $nowPid = 0;
	
	function show(){
		
		loadInstallList();
		
		$container.style.display = "block";
	}
	
	function hide(){
		
		$container.style.display = "none";
	}
	
	function downNpm(){
		
		var npm_name = $("js_npm_name").value;
		var npm_ver = $("js_npm_ver").value;
		
		if(!npm_name)return alert("请输入插件名");
		
		useNpmProcess(npm_name,npm_ver);
	}
	
	function useNpmProcess(npm_name,npm_ver){
		
		$("js_npm_log_list").innerHTML = "";
		addNpmLog('开始下载...');
		
		var old_execPath = process.cwd();
		var path = require("path");
		
		process.chdir(Common.execPath);
		
		var exec = require("child_process").exec; 

		var child = exec("npm install "+npm_name+(npm_ver?"@"+npm_ver:""));
		
		$nowPid = child.pid;

		child.stdout.on('data', function (data) {
			console.log('标准输出：' + data);
			
			addNpmLog(data);
		});
		
		child.stderr.on('data',function(data){
			console.log(data);
			
			addNpmLog(data);
		});

		child.on('exit', function (code) {
			console.log('执行完毕');
			
			addNpmLog('执行完毕...');
			
			process.chdir(old_execPath);
			
			loadInstallList();
			
			$("js_npm_name").value = "";
			$("js_npm_ver").value = "";
			
			$nowPid = 0;
		});
	}
	
	function addNpmLog(msg){
		
		$("js_npm_log_container").style.display= "block";
		
		var span = document.createElement("span");
		span.innerHTML = msg.split(/\n/gi).join('<br />');
		
		if(msg.indexOf("ERR") > -1){
			
			span.style.color = "red";
		}
		else if(msg.indexOf("WARN") > -1){
			
			span.style.color = "deeppink";
		}
		else if(msg.indexOf("http") > -1 || msg.indexOf("GET") > -1){
			
			span.style.color = "green";
		}
		
		$("js_npm_log_list").appendChild(span);
		
		$("js_npm_log_list").scrollTop = $("js_npm_log_list").scrollHeight;
	}
	
	function hideNpmLog(){
		
		$("js_npm_log_container").style.display= "none";
		
		if($nowPid > 0)process.kill($nowPid);
	}
	
	function loadInstallList(){

		var path = require("path");
		var fs = require("fs");
		
		var npm_path = path.join(Common.execPath,"node_modules");
		
		var npm_list = [];
		
		var list_html = '';
		
		var dirList = fs.readdirSync(npm_path);
		dirList.forEach(function(item){
			if(fs.statSync(npm_path + '/' + item).isDirectory()){
				
				if(item.indexOf(".") == -1){
				
					npm_list.push(item);
					
					//读取版本号文件
					var content = fs.readFileSync(npm_path + '/' + item + '/package.json');
					content = content.toString();
					content = JSON.parse(content);
					
					list_html += '<li>'+item+'：'+content.version+'</li>';
				}
			}
		});
		
		$list.innerHTML = list_html;
	}
	
	
	return {
		show : show,
		hide : hide,
		downNpm : downNpm,
		hideNpmLog : hideNpmLog
	};
}();