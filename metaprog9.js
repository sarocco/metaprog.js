var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');

function main() {
	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' }),
    astBlock = searchAstBlock(source) ;

}

function searchAstBlock(source){
	var c;
	do{
		c = 0;
		var regularExp = /\[[<>]((?:(?!\[[<>]).)*?)[<>]\]/gm,
			source = source.replace(regularExp , function (match, code){
				if (match.startsWith("[<")){
					ast = esprima.parse(code);
					c++;
					return JSON.stringify(ast.body[0]);
				}else{
					codeBlock = eval(code);
					codigo = escodegen.generate(codeBlock);
					c++;
					return codigo;
				}
		});
	} while (c>0);
	console.log(source);
}

main()
