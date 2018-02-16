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
  //console.log(list);
  parse(list, 0, nivelInicial);
}

function parse(list, position, level){

  if (position > list.length- 1) {
    return;
    }
  var element = list[position];

  proximoNivel = level

  if ("[" == element) {
    proximoNivel ++;
  }
  else if ("]" == element) {
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
    console.log("Cierra Nodo:" + level);
  }
  parse(list, position + 1, proximoNivel);

}

main()
