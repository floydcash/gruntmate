
var Compass = function(){
	
	var $compassDom = null;
	
	function initAddCompass(){
		
		if($compassDom)return false;
		
		$compassDom = document.createElement("div");
		$compassDom.className = "commonBox addForm";
		
		$compassDom.innerHTML = '<div class="head"><span>新建Compass项目</span><a href="javascript:void(0)" class="close" onclick="Compass.hide()" title="关闭">&times;</a></div>\
			<div class="ctn">\
				<ul>\
					<li><label>工程名</label><input type="text" id="js_compass_name" placeholder="工程名" value="" /></li>\
					<li><label>工程地址</label><input type="text" id="js_compass_path" placeholder="工程地址" value="" /></li>\
					<li><label>Compass目录</label><input type="text" id="js_compass_src" placeholder="默认不填为scss" /></li>\
					<li><label>生成css目录</label><input type="text" id="js_compass_css" placeholder="默认不填为css" /></li>\
				</ul>\
				<button class="confirm-btn" onclick="Compass.addProject()">添加</button>\
			</div>';
		
		document.body.appendChild($compassDom);
	}
	
	function show(){
		
		initAddCompass();
		
		$compassDom.style.display = "block";
	}
	
	function hide(){
		
		$compassDom.style.display = "none";
	}
	
	function addProject(){
	
		var name = $("js_compass_name").value;
		var project_path = $("js_compass_path").value;
		var sass_path = $("js_compass_src").value || "scss";
		var css_path = $("js_compass_css").value || "css";
		
		createGruntFile(project_path,sass_path,css_path);
		
		ProjectManager.addProject(name,project_path,"default");
		
		hide();
	}
	
	function createGruntFile(project_path,sass_path,css_path){
		
		var content = 'module.exports = function(grunt){\
					grunt.initConfig({\
					  compass: {\
						dist: {\
						  options: {\
							sassDir: "'+sass_path+'",\
							cssDir: "'+css_path+'",\
							outputStyle: "nested",\
							noLineComments: false\
						  }\
						}\
					  },\
					  watch : {\
						compass : {\
							files : "'+sass_path+'/*",\
							options: {\
								nospawn: true,\
								livereload : true\
							},\
							tasks:["compass"]\
						}\
					}\
					});\
					grunt.loadNpmTasks("grunt-contrib-compass");\
					grunt.loadNpmTasks("grunt-contrib-watch");\
					grunt.registerTask("default", ["compass","watch"]);\
					}';
		
		var fs = require("fs");
		var path = require("path");

		var execPath = path.join(project_path,"Gruntfile.js");

		fs.writeFileSync(execPath, content);
	}
	
	return {
		show : show,
		hide : hide,
		addProject : addProject
	};
	
}();