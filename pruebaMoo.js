const moo = require('moo');
var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');

function main() {
  var stdin = process.stdin,
    stdout = process.stdout,
    source = fs.readFileSync(stdin.fd, { encoding: 'utf8' });
    let lexer = moo.compile({
      WS:      /[ \t]+/,
      comment: /\/\/.*?$/,
      number:  /0|[1-9][0-9]*/,
      string:  /"(?:\\["\\]|[^\n"\\])*"/,
      lparen:  '(',
      rparen:  ')',
      keyword: ['[<', '[>', '>]', '<]'],
      NL:      { match: /\n/, lineBreaks: true },
    });
    let tokens = Array.from(lexer);
    console.log(tokens);
}
main();
