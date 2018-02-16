/*
 *  Ce script permet de colorer des mots clés définis par des expressions réguiliéres (regex)
 *  Il parse le texte à colorer, détecte les mots définies par les regex et les englobent dans une balise <span> avec une classe qui déterminera la couleur définie dans le css  
 *  ex:  <span class="sqlVar">CREATE</span>
 *  Ce code est simplifié au possible, vous pourrez par exemple définir une "classe" gérant la coloration avec des méthodes propres aux languages souhaité (javascript, sql, php, etc...)
 * 	Réalisé par M.LAHITTE le 17 mai 2017
 */


var LibHighLigthSyntax = (function(){
	
	//create sql set
	var sqlCmd = /\b(ADD|ALL|ALTER|AND|AS|BETWEEN|BY|CASE|CHECK|COLUMN|COMMENT|COUNT|CREATE|DATABASE|DELETE|ENUM|FLUSH|FOREIGN|FROM|GRANT|GROUP|IDENTIFIED|IF|INDEX|INNER|INSERT|IS|KEY|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|PRIVILEGES|REFERENCES|SELECT|TABLE|TYPE|TO|UNIQUE|UPDATE|WHEN|WHERE)(?=[^\w])/g;
	var sqlVar=/\b(bigint|bigserial|bit|bit varying|boolean|box|bytea|character varying|character|cidr|circle|date|double precision|inet|integer|interval|line|lseg|macaddr|money|numeric|path|point|polygon|real|smallint|serial|text|time|time with timezone|timestamp|timestamp (TZ)|tsquery|tsvector|txid_snapshot|uuid|xml)/g;
	var multiLines  = /(\/\*.*\*\/)/g;
	var inline=/(--(.+?)\n|--\n)/g;
	var quoted=/('(.+)')/g;
	
	
	function getElem(id){
		//l'element contenant le texte
		this._id=id;
		this._codeElement = document.getElementById(this._id);
		this._string = this._codeElement.innerHTML;
		this._parsed = this._string.replace(inline,'<span class="multilines">$1</span>');
	this._parsed = this._parsed.replace(sqlVar,'<span class="sqlVar">$1</span>');
	this._parsed = this._parsed.replace(sqlCmd,'<span class="sqlCmd">$1</span>');
	this._parsed = this._parsed.replace(multiLines,'<span class="multilines">$1</span>');
	this._parsed = this._parsed.replace(quoted,'<span class="quoted">$1</span>');
	
	//affichage du résultat
	this._codeElement.innerHTML = this._parsed;
	
	
			
	};
	
	return {'getElem':getElem}
	
})();

