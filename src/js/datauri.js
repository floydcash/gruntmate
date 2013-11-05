
var DataUri = function(){
	
	function show(){
		
		$("js_datauri").style.display="block";
	}
	
	function hide(){
		$("js_datauri").style.display="none";
	}
	
	function change(){
		
		var source = $("js_datauri_file").value;
		
		if(!source)return false;
		
		var Datauri = require('./lib/datauri/datauri');

		// without instance
		var datauri = Datauri(source);
		//console.log(datauri); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
		
		$("js_datauri_val").value = datauri;
	}
	
	return {
		show : show,
		hide : hide,
		change : change
	};
	
}();