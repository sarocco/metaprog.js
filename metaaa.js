var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');

function main() {
	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' }),
    ast = esprima.parse(source);
	  fs.writeFileSync(stdout.fd, '/* '+ JSON.stringify(ast.body[0], null, '\t') +'*/\n');
	//fs.writeFileSync(stdout.fd, escodegen.generate(ast));

		code = eval(ast);
		final = escodegen.generate(code);
		console.log(final);

		/*parseado =  {
        "type": "ExpressionStatement",
        "expression": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                },
                "right": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                }
        }
};*/
//unparser = escodegen.generate(parseado);
//console.log(unparser);

//evaluado = eval(parseado);
//console.log(evaluado);
}
main();
