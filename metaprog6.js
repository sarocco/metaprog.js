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
  parse(list, 0);
}

function parse(list, position){
	var pila =[];
  if (position > list.length- 1) {
    return;
    }
  var element = list[position];
	var element2 = list[position+1];

  if ("[" == element && ">" == element2) {
    pila.push(element);
		pila.push(element2);
		j=position +2;
		for (i = j; i < list.length-1; i++){
			var element3 = list[j];
			var element4 = list[j+1];
			console.log(element4);
			if("[" == element3 && "<"== element4){
				pila.push(element3);
				pila.push(element4);
				console.log(pila);
			}
			else if(">" == element3 && "]" == element4){
				pila.pop(element3);
				pila.pop(element4);

			}
		}
  }
  /*else if (">" == element && "]" == element2) {
    proximoNivel --;
  }
  else if (">" == element) {
    for (i = 0; i < proximoNivel; i++) {
      console.log("  ");
    }
    console.log("Cierra Nodo:" + level);

  }else if ("<" != element && "]" != element && "," != element) {

    for (i = 0; i < proximoNivel; i++) {
        console.log("  ");
      }
    //console.log("Comienza Nodo: " + level);
    map[level] = element;
    console.log(map[level]);

    var max = 0;
    for (var x in map) { max = (max < parseFloat(x)) ? parseFloat(x) : max;
    }
    console.log(max);

  }
  if (proximoNivel > level && level != nivelInicial) {
    console.log("Cierra Nodo:" );
  }*/
//  parse(list, position + 1);
}

main()
