
var SearchLog = function(){
	
	var $lastCount = 0;
	var $lastKey = "";
	var $nowIndex = 0;
	var $lastProject = "";
	
	var $init = false;
	
	//显示/隐藏搜索
	function toggle(){
		
		var content = $("js_search_container");
		
		content.style.display = content.style.display=="block"?"none":"block";
		
		if(content.style.display == "block"){
			$("js_search_input").focus();
			$("js_search_input").select();
		}
		
		initEvent();
	}
	
	function initEvent(){
		
		if($init)return false;
		
		$("js_search_input").onkeydown = function(e){
			
			//按了回车
			if(e.keyCode == 13){
				
				search();
			}
			
			//按了Esc
			if(e.keyCode == 27){
				
				toggle();
			}
		}
	}
	
	function search(){
		
		if($CurrentProject === "")return false;
		
		var log_dom = $("js_right_ctn_"+$CurrentProject).lastChild;
		
		var key = $("js_search_input").value;
		
		if(key == $lastKey && key != "" && $lastProject == $CurrentProject)return nextKeyPosition();
		
		clearResult(log_dom);
		
		if($CurrentProject != $lastProject && $lastProject != "")clearResult($("js_right_ctn_"+$lastProject).lastChild);
		
		if(!key)return false;
		
		var log_html = log_dom.innerHTML;
		
		var reg = new RegExp('<span[^>]*>[^<]*('+html.encode(key)+')[^<]*</span>',"gi");
		
		var count = 0;
		
		log_html = log_html.replace(reg,function(a,b){
			
			var r = new RegExp(b,'gi');
			
			return a.replace(r,'<label id="js_search_res_'+(++count)+'" style="background-color:darkgreen;color:white;">'+b+'</label>');
		});
		
		log_dom.innerHTML = log_html;
		
		$lastCount = count;
		$lastKey = key;
		$nowIndex = count > 0?1:0;
		$lastProject = $CurrentProject;
		
		if(count>0){scroll(1);}
	}
	
	function clearResult(log_dom){
		
		log_dom.innerHTML = log_dom.innerHTML.replace(/<label[^>]+>/gi,'').replace(/<\/label>/gi,'');
	}
	
	function nextKeyPosition(){
		
		$nowIndex += 1;
		
		if($nowIndex > $lastCount)$nowIndex = 1;
		
		scroll($nowIndex);
	}
	
	function scroll(index){
		
		var label = $("js_search_res_"+index);
		
		var log_dom = $("js_right_ctn_"+$CurrentProject).lastChild;
		
		$("js_search_res_"+(index-1<1?$lastCount:index-1)).style.backgroundColor = "darkgreen";
		label.style.backgroundColor = "orange";
		
		log_dom.scrollTop = label.offsetTop - 50;
	}
	
	return {
		search : search,
		toggle : toggle
	};
	
}();
