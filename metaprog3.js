
var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');

function main() {
	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' });
  //var regularExp = /((?:(\[<))|(?:(>\])))/;
  //var stoke = source.split(regularExp);
	//var stoke = source.split(("[<"));
	//console.log(nuevaCadena);
 	//console.log(source.length);
ast = searchAstBlock(source);
console.log(ast);

}

function searchAstBlock(source) {
	var inside ="";
	//console.log(source);
	var lowerThan = source.indexOf("[<")+2; //se suman 2 indices dado que el indexOf se para antes de el indice que estoy buscando
	var greaterThan = source.lastIndexOf(">]");
	if (lowerThan == 1 || greaterThan == -1) {//las funciones indexOf y lastIndexOf devuelven -1 cuando no existe el indice a buscar
		return source;
	}else{
			inside = searchAstBlock(source.substr(lowerThan, greaterThan-lowerThan));//inside es el codigo dentro de [<inside>]
			tree = esprima.parse(inside);
			var nuevaCadena = source.replace(inside,JSON.stringify(tree, null, '\t'));
			console.log(nuevaCadena);
	}
}

main();
