var html = function () {
	var rdecodeEntity = /&quot;|&lt;|&gt;|&amp;|&nbsp;|&apos;|&#(\d+);|&#(\d+)/g;
    var rencodeEntity = /['<> "&]/g;
    var decodeEntities = {
        '&quot;':'"',
        '&lt;':'<',
        '&gt;':'>',
        '&amp;':'&',
        '&nbsp;':' '
    };
    var rhtmlSpace = /\u00a0/g;
    var rbr = /<br\s*\/?>/ig;
    var rlf = /\r?\n/g;
    var rspace = /\s/g;

    var encodeEntities = {};
    for (var i in decodeEntities) {
        encodeEntities[decodeEntities[i]] = i;
    }

    decodeEntities['&apos;'] = '\'';
    encodeEntities['\''] = '&#39;'; //&apos; (IE不支持)

    function fdecodeEntity(matched, charCode, lastCharCode) {
        if (!charCode && !lastCharCode) {
            return decodeEntities[matched] || matched;
        }
        return String.fromCharCode(charCode || lastCharCode);
    }

    function fencodeEntity(matched) {
        return encodeEntities[matched];
    }

    return {
        encode:function (text) {
            return text ? ('' + text).replace(rencodeEntity, fencodeEntity).replace(rlf, '<br/>').replace(rspace, '&nbsp;') : '';
        },
        decode:function (text) {
            return text ? ('' + text).replace(rbr, '\n').replace(rdecodeEntity, fdecodeEntity).replace(rhtmlSpace, ' ') : '';
        },
		//encodeBase16
		encodeBase16 : function(str){
			if(!str) return str;
			str = str + '';
			var _en = [];
			for(var i = 0,len = str.length;i<len;i++){
				_en.push(str.charCodeAt(i).toString(16).toUpperCase());
			}
			return _en.join('');
		},
		//decodeBase16
		decodeBase16 : function(str){
			if(!str) return str;
			str = str + '';
			var out = [];
			for(var i =0,len = str.length;i<len;i= i+2){
				out.push(String.fromCharCode('0x' + str.slice(i,i + 2)));
			}
			return  out.join('');
		}
    };
}();