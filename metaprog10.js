var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');

function main() {
	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' });
    var regularExp1 = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/gm,
		sourceWC = source.replace(regularExp1,'');
		console.log(sourceWC);
		astBlock = searchAstBlock(sourceWC) ;
}

function searchAstBlock(sourceWC){
	var c;
	do{
		c = 0;
		var regularExp2 = /\[[<>]((?:(?!\[[<>]).)*?)[<>]\]/gm,
			sourceWC = sourceWC.replace(regularExp2 , function (match, code){
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
	console.log(sourceWC);
}

main()
