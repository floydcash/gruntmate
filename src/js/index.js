
var Main = function(){

	var $Worker = require("./lib/worker/worker").Worker;

	var $current_work = null;
	
	var $watchGrunt = null;

	function start(btn,p_num){
		
		var project = $ProjectList[p_num];
		
		var fs = require("fs");
		var path = require("path");
		var watchfile = path.join(project.path,"Gruntfile.js");

		//结束grunt
		if(project.isStart){

			btn.innerHTML = "启动";
			project.isStart = false;
			btn.className = "";
	
			$watchGrunt.close();
	
			stopGrunt(project);
		}
		//启动grunt
		else {

			if($current_work)return alert("当前有Grunt任务，请先停止后再启动新的!");

			btn.innerHTML = "停止";
			project.isStart = true;
			btn.className = "warn";
			
			$watchGrunt = fs.watch(watchfile,function(event,filename){
				
				start(btn,p_num);
				start(btn,p_num);
			});
	
			startGrunt(project);
		}
	}

	function startGrunt(project){

		var p_num = $ProjectHash[project.name];

		clearLog(p_num);

		console.tolog("Grunt:"+project.currentTasks+" is Start",p_num);
		
		$current_work = new $Worker("./child_grunt.js");
		
		//console.log($current_work);
		
		var execpath = project.plus == 1?Common.execPath:project.path;
		
		$current_work.postMessage({
		  path : project.path,
		  exec_path : execpath,
		  exec_param : project.currentTasks
		});
		
		  
		$current_work.impl.addMessageEvent(function(data){

			var msg = data.toString().replace(/\[\d+m/gi,"");

			if(!msg || msg.indexOf("HANDSHAKE")>-1)return false;

			console.tolog(msg,p_num);

			if(msg.lastIndexOf("Grunt is over") > -1){
			
				var start_btn = $("js_right_ctn_"+p_num).querySelector(".warn");
				
				if(start_btn)start(start_btn,p_num);
			}

			checkNews(p_num);
		});
	}

	function stopGrunt(project){

		$current_work.terminate();
		$current_work.impl.clearMessageEvent();
		process.kill($current_work.impl.child.pid);

		var p_num = $ProjectHash[project.name];
		
		$current_work = null;

		console.tolog("Grunt is Stop",p_num);
	}

	function checkNews(p_num){

		if(p_num == $CurrentProject)return false;

		$("js_left_bar_"+p_num).style.backgroundColor = "orange";
	}

	function clearLog(p_num){

		$("js_right_ctn_"+p_num).lastChild.innerHTML ="";
	}
	
	function init(){
		
		bindEvent();
	}
	
	function bindEvent(){
		
		var gui = require('nw.gui');
		var win = gui.Window.get();
		
		$("js_header_min").onclick = function(){
			
			win.minimize();
		}
		$("js_header_close").onclick = function(){
			
			win.close();
		}
		
		//搜索快捷键
		document.onkeydown = function(e){
			
			if(e.keyCode == 70 && e.ctrlKey){
				
				SearchLog.toggle();
			}
		}

	}
	
	var exports = {
		start : start,
		clearLog : clearLog,
		init : init
	};
	
	return exports;
}();

Main.init();
