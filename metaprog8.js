var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');
  var map = {};
  var nivelInicial=0;


function main() {
	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' }),
    delimiter = searchDelimiters(source)

		//ast = searchAstBlock(source) ;

	//fs.writeFileSync(stdout.fd, '/* '+ JSON.stringify(ast, null, '\t') +'*/\n');
	//fs.writeFileSync(stdout.fd, escodegen.generate(ast));
	//console.log(ast);
}

function searchDelimiters(source){
  var cadena = source;
	//var delimitadores = /\[[<>]|[<>]\]/;
  var delimitadores = ["[", "<", ">", "]"];
  var list = [];
  var string = '';
  for (i = 0; i < cadena.length; i++) {

    if (delimitadores.includes(cadena.charAt(i))) {
      if (string != '') {
        list.push(string)
         string = '';
      }
          list.push(cadena.charAt(i));
    } else {
      string = string + cadena.charAt(i);
    }
  }
  console.log(list);
  parsear(list, 0);
}

var pila =[];
var ultimo = "";
var astBlock;
var codeBlock;

function parsear(list, position){

	for (i = 0; i < list.length; i++){
		var element = list[position];
		var element2 = list[position+1];
		if (position > list.length- 1) {
			return;
			}
		else if ("[" == element && ">" == element2) {
		  pila.push(element+element2);
			ultimo = "["+">";
			position+2;
		  }
		else if ("[" == element && "<" == element2) {
		  pila.push(element+element2);
			ultimo = "["+"<";
			position+2;
		  }
		else if (">" == element && "]" == element2) {
			if(ultimo = "["+"<"){
				astBlock = list[position];
				ast = esprima.parse(astBlock);
				pila.pop(element-1);
				}
				console.log(pila);
			}
		else if ("<" == element && "]" == element2) {
			if(ultimo = ">"+"]"){
				toEval = list[position];
				codeBlock = eval(toEval);
				code = escodegen.generate(codeBlock);
				pila.pop(element-1);
				}
			}

	}

    //console.log(pila)
}

main()
