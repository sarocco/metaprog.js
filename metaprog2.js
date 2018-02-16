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
	//console.log(source);
	var lowerThan = source.indexOf("[<")+2; //se suman 2 indices dado que el indexOf se para antes de el indice que estoy buscando
	var greaterThan = source.lastIndexOf(">]");
	if (lowerThan == 1 || greaterThan == -1) {//las funciones indexOf y lastIndexOf devuelven -1 cuendo no existe el indice a buscar
		return source;
	}else{

		inside = source.substr(lowerThan, greaterThan-lowerThan);//inside es el codigo dentro de [<inside>]
		searchAstBlock(inside);
  	var adentro = inside;
		//console.log(inside);
	}
//  console.log(inside);

  var tree = esprima.parse(adentro);
  //console.log(tree);

  var outside = source.split(inside);

  outside = outside[0] + outside[1];
  console.log(outside);
	tree =+ esprima.parse(outside);

	var regularExp = /((?:(\[<))|(?:(>\])))/;

  //console.log(nuevo[0]+nuevo[1]);
  //var piquito = /\[</;
//  var toArray = outside.split(piquito);//separa el texto en base a la exp regular
	//toArray = outside.split(regularExp);//separa el texto en base a la exp regular
  //tree = esprima.parse(toArray);
	//var string = JSON.stringify(tree, null, '\t');

	//var result = toArray[0]+string;
	//return result;
}

//function searchCodeBlock(source) {}

main();
