/*
 *  Ce script permet de colorer des mots clés définis par des expressions réguiliéres (regex)
 *  Il parse le texte à colorer, détecte les mots définies par les regex et les englobent dans une balise <span> avec une classe qui déterminera la couleur définie dans le css  
 *  ex:  <span class="sqlVar">CREATE</span>
 *  Ce code est simplifié au possible, vous pourrez par exemple définir une "classe" gérant la coloration avec des méthodes propres aux languages souhaité (javascript, sql, php, etc...)
 * 	Réalisé par M.LAHITTE le 17 mai 2017
 */


function syntax(){
	//l'element contenant le texte
	var codeElement = document.getElementById('colored');

	/*les regex (commandes sql, variables sql, commentaires, et texte entre apostrophes)
	* vous pouvez personnaliser la liste, il suffit d'ajouter votre mots suivi du caractére pipe.
	*/
	var sqlCmd = /\b(ADD|ALL|ALTER|AND|AS|BETWEEN|BY|CASE|CHECK|COLUMN|COMMENT|COUNT|CREATE|DATABASE|DELETE|ENUM|FLUSH|FOREIGN|FROM|GRANT|GROUP|IDENTIFIED|IF|INDEX|INNER|INSERT|IS|KEY|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|PRIVILEGES|REFERENCES|SELECT|TABLE|TYPE|TO|UNIQUE|UPDATE|WHEN|WHERE)(?=[^\w])/g;
	var sqlVar=/\b(bigint|bigserial|bit|bit varying|boolean|box|bytea|character varying|character|cidr|circle|date|double precision|inet|integer|interval|line|lseg|macaddr|money|numeric|path|point|polygon|real|smallint|serial|text|time|time with timezone|timestamp|timestamp (TZ)|tsquery|tsvector|txid_snapshot|uuid|xml)/g;
	var multiLines  = /(\/\*.*\*\/)/g;
	var inline=/(--(.+?)\n|--\n)/g;
	var quoted=/('(.+)')/g;

	// regex javascript
	//specialJsReg = /\b(getElementsBy(TagName|ClassName|Name)|getElementById|typeof|instanceof)(?=[^\w])/g,
	
	//recupération du texte		
	string = codeElement.innerHTML;
	
	/*coloration syntaxique
	* attention à l'ordre!
	* le script rajoute des span contenant des guillemets (<span class="sqlCmd">)
	* si vous décidez de colorer du texte entre guillemets il faudra le faire au premier parse sinon le script prendra en compte le span!
	*/
	var parsed = string.replace(inline,'<span class="multilines">$1</span>');
	parsed = parsed.replace(sqlVar,'<span class="sqlVar">$1</span>');
	parsed = parsed.replace(sqlCmd,'<span class="sqlCmd">$1</span>');
	parsed = parsed.replace(multiLines,'<span class="multilines">$1</span>');
	parsed = parsed.replace(quoted,'<span class="quoted">$1</span>');
	
	//affichage du résultat
	codeElement.innerHTML = parsed;
}
window.addEventListener('load',syntax,false);
