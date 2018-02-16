/*
 *  This library colorise SQL syntax in a html code tag.
 *  You can add expression in the regex variables.
 *  The getElem method parses the text in order to match a regular expression expanding to it a span tag (see syntax.css).
 *  ex:  <span class="sqlVar">CREATE</span>
 *  by M.LAHITTE 2017
 */


var LibhighLigthSyntax = (function(){
	
	//create sql syntax set
	var sqlCmd = /\b(ADD|ALL|ALTER|AND|AS|BETWEEN|BY|CASE|CHECK|COLUMN|COMMENT|COUNT|CREATE|DATABASE|DELETE|ENUM|FLUSH|FOREIGN|FROM|GRANT|GROUP|IDENTIFIED|IF|INDEX|INNER|INSERT|IS|KEY|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|PRIVILEGES|REFERENCES|SELECT|TABLE|TYPE|TO|UNIQUE|UPDATE|WHEN|WHERE)(?=[^\w])/g;
	var sqlVar=/\b(bigint|bigserial|bit|bit varying|boolean|box|bytea|character varying|character|cidr|circle|date|double precision|inet|integer|interval|line|lseg|macaddr|money|numeric|path|point|polygon|real|smallint|serial|text|time|time with timezone|timestamp|timestamp (TZ)|tsquery|tsvector|txid_snapshot|uuid|xml)/g;
	var multiLines  = /(\/\*.*\*\/)/g;
	var inline=/(--(.+?)\n|--\n)/g;
	var quoted=/('(.+)')/g;
	
	
	function getElem(id){
		//text element
		this._id=id;
		this._codeElement = document.getElementById(this._id);
		this._string = this._codeElement.innerHTML;
		//parse the text (the order is important...)
		this._parsed = this._string.replace(inline,'<span class="multilines">$1</span>');
		this._parsed = this._parsed.replace(sqlVar,'<span class="sqlVar">$1</span>');
		this._parsed = this._parsed.replace(sqlCmd,'<span class="sqlCmd">$1</span>');
		this._parsed = this._parsed.replace(multiLines,'<span class="multilines">$1</span>');
		this._parsed = this._parsed.replace(quoted,'<span class="quoted">$1</span>');
		
		//display the result
		this._codeElement.innerHTML = this._parsed;			
	};
	
	return {'getElem':getElem}
	
})();
