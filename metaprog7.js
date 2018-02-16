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

function parsear(list, position){
	var pila =[];
  if (position > list.length- 1) {
    return;
    }
  
  var element = list[position];
  var element2 = list[position+1];
  if ("[" == element && ">" == element2) {
    pila.push(element+element2);
  }
  else if ("[" == element && "<" == element2) {
    pila.push(element);
  	pila.push(element2);
  }
  else if (pila[pila.length - 1]==">" && pila[pila.length - 2]=="]") {
    pila.pop(element);
    nodo = esprima.parse(element);
    list.split();

  }
    //console.log(pila)
}

main()
