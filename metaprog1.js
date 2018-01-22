var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');

function main() {
	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' }),
		ast = searchAstBlock(source) ;
	//fs.writeFileSync(stdout.fd, '/* '+ JSON.stringify(ast, null, '\t') +'*/\n');
	//fs.writeFileSync(stdout.fd, escodegen.generate(ast));
	console.log(ast);
}

function searchAstBlock(source) {
	var inside ="";
	var cont = 0;
	//console.log(source);
  var lowerThan = source.indexOf("[<")+2; //se suman 2 indices dado que el indexOf se para antes de el indice que estoy buscando
	var greaterThan = source.lastIndexOf(">]");
	if (lowerThan == 1 || greaterThan == -1) {//las funciones indexOf y lastIndexOf devuelven -1 cuando no existe el indice a buscar
		return source;
	}else{
    inside = source.split(inside);
		inside = searchAstBlock(source.substr(lowerThan, greaterThan-lowerThan));//inside es el codigo dentro de [<inside>]
  }

	tree = esprima.parse(inside);
	var regularExp = /((?:(\[>))|(?:(<\])))/;
	var toArray = source.split(regularExp);//separa el texto en base a la exp regular
	var string = JSON.stringify(tree, null, '\t');

	var cont =+1
	var result = toArray[0]+string;
	return result;
}

main();
