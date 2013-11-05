
var Compress = function(){
	
	function show(){
		
		$("js_compress").style.display="block";
	}
	
	function hide(){
		$("js_compress").style.display="none";
	}
	
	function change(){
		
		var source = $("js_left_source").value;
		var select_type = parseInt($("js_compress_select").value,10);
		
		if(!source)return false;
		
		var jsp = require("./lib/uglify/uglify-js").parser;
		var pro = require("./lib/uglify/uglify-js").uglify;

		var orig_code = source;
		var ast = jsp.parse(orig_code); // parse code and get the initial AST
		ast = pro.ast_mangle(ast); // get a new AST with mangled names
		ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
		var final_code = pro.gen_code(ast,{beautify: !!select_type}); // compressed code here
		
		$("js_right_compress").value = final_code;
	}
	
	return {
		show : show,
		hide : hide,
		change : change
	};
	
}();