
var Main = function(){

	var $Worker = require("./lib/worker/worker").Worker;

	var $current_work = null;
	
	var $gruntId = 0;
	
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

			if($gruntId)return alert("当前有Grunt任务，请先停止后再启动新的!");

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

		gruntLog(project);
	}

	function stopGrunt(project){

		$current_work.terminate();
		process.kill($current_work.impl.child.pid);

		clearInterval($gruntId);
		$gruntId = 0;

		var p_num = $ProjectHash[project.name];

		console.tolog("Grunt is Stop",p_num);
	}

	function gruntLog(project){

		var p_num = $ProjectHash[project.name];

		$gruntId = setInterval(function(){

			var msg = $current_work.impl.buffer.replace(/\[\d+m/gi,"");
			
			if(!msg)return false;
			
			console.tolog(msg,p_num);
			
			$current_work.impl.buffer = "";

			checkNews(p_num);

		},500);
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
		
		$("js_header").onmousedown = function(e){
			
			var startX = e.offsetX;
			var startY = e.offsetY;
			
			$("js_header").onmousemove = function(e){
				
				win.moveTo(e.offsetX - startX + win.x,e.offsetY - startY + win.y);
				
				//win.moveBy(e.offsetX - startX, e.offsetY - startY);
			}
			
			$("js_header").onmouseup = function(e){
				
				startX = e.offsetX;
				startY = e.offsetY;
				
				$("js_header").onmousemove = null;
				$("js_header").onmouseup = null;
			}
		}
		document.onmouseout = document.onmouseup = function(){
			
			$("js_header").onmousemove = null;
			$("js_header").onmouseup = null;
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
