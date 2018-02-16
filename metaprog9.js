var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');
  var map = {};
  var nivelInicial=0;


function main() {
	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' }),
    astBlock = searchAstBlock(source) ;

}

function searchAstBlock(source){
	var regularExp = /\[<((?:(?!\[[<>]).)*?)[<>]\]/g,
		r = source.replace(regularExp , function (match, code){
			if (match.startsWith("[<")){
				ast = esprima.parse(code);
				return JSON.stringify(ast.body[0]);
			}else{
				codeBlock = eval(code);
				codigo = escodegen.generate(codeBlock)
				return codigo;
			}

	});
	console.log(r);
}

main()
