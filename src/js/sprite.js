
var Sprite = function(){
	
	function show(){
		
		$("js_sprite").style.display="block";
	}
	
	function hide(){
		$("js_sprite").style.display="none";
	}
	
	function change(){
		
		var spriter = require('./lib/ispriter/ispriter');
		
		var cssfrom = $("js_sprite_cssfrom").value;
		var imgfrom = $("js_sprite_typefrom").value || "png";
		var mergefrom = $("js_sprite_mergefrom").value || "";
		var cssto = $("js_sprite_cssto").value;
		var imgto = $("js_sprite_imgto").value;
		var paddingto = $("js_sprite_paddingto").value || 0;
		var typeto = $("js_sprite_typeto").value || "png";
		
		if(!cssfrom || !cssto || !imgto)return false;
		
		if(mergefrom)mergefrom = "^("+mergefrom.split(" ").join("|")+").*"+imgfrom+"$";

		var obj = {
			"algorithm": "growingpacker",//optional 目前只有 growingpacker
			"input": {
				"cssRoot": cssfrom, //required
				"imageRoot": "",//optional 默认 cssRoot
				"format": imgfrom,//optional
				"spriteMerge":mergefrom
			},
			"output": {
				"cssRoot": cssto,//required
				"imageRoot": imgto,//optional 相对于 cssRoot 的路径, 默认 "./image/", 最终会变成合并后的的图片路径写在css文件中
				"maxSize": 0,//optional 图片容量的最大大小, 单位 KB, 默认 0
				"margin": paddingto,//optional 合成之后, 图片间的空隙, 默认 0
				"prefix": "sprite_",//optional 
				"format": typeto,//optional 输出的图片格式
				"combine": false//optional 为true时将所有图片合并为一张, 同时所有css文件合并为一个文件
			}
		}

		spriter.merge(obj);
		
		alert("生成完毕!");
	}
	
	return {
		show : show,
		hide : hide,
		change : change
	};
	
}();