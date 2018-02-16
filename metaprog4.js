var fs = require('fs'),
	esprima = require('esprima'),
	escodegen = require('escodegen');
var delimiters, startPos, retDelims;
var maxPosition;
var delimiterCodePoints = [];
var proximoNivel;
var nivelInicial=0;
var list = [];
var currentPosition = 0;
var newPosition = -1;
var delimsChanged = false;

function main() {
  	var stdin = process.stdin,
		stdout = process.stdout,
		source = fs.readFileSync(stdin.fd, { encoding: 'utf8' });
    ast = searchAstBlock(source) ;
	//fs.writeFileSync(stdout.fd, '/* '+ JSON.stringify(ast, null, '\t') +'*/\n');
	//fs.writeFileSync(stdout.fd, escodegen.generate(ast));
	console.log(ast);
}

function searchAstBlock(source) {
  tokens = tokenizar(source, "[<>]", true);
  var i;
  while (hasMoreTokens(tokens)) {
    list.add(nextToken(tokens));
    i = list.size()-1;
		console.log("hols");
    console.log(list.get(i));
  }
  parse(list, 0, nivelInicial);
}

function parse(list, position, level){
  if (position > list.size - 1) {
    return;
    }
  var element = list[position];
  proximoNivel = level;

  if ("["==element.charAt()) {
    proximoNivel++;
  } else if ("]".localeCompare(element)) {
    proximoNivel--;
  } else if (">".localeCompare(element)) {
    for (i = 0; i < proximoNivel; i++) {
      console.log("  ");
    }
    console.log("Cierra Nodo:" + level);
    } else if (!("<".localeCompare(element) || "]".localeCompare(element) || ",".localeCompare(element))) {
      for (i = 0; i < proximoNivel; i++) {
        console.log("  ");
      }
      console.log("Comienza Nodo: " + level);
      console.log(element);
      }
      if (proximoNivel > level && level != nivelInicial) {
      console.log("Cierra Nodo:" + level);
      }
      parse(list, position + 1, proximoNivel);
    }



function tokenizar(str, delim, flag){
  //this.str = str;
   maxPosition = str.length;
	delimiters = delim;
 retDelims = flag;
  setMaxDelimCodePoint();
}

function charCount(c){
  return c >=  0x010000 ? 2 : 1;
}

function setMaxDelimCodePoint() {
  if (delimiters == null) {
    maxDelimCodePoint = 0;
    return;
    }
  var m = 0;
  var c;
  var count = 0;
  for (var i = 0; i < delimiters.length; i += charCount(c)) {
    c = delimiters.charAt(i);
    if (c >= '\uD800' && c <= '\uDFFF') {
      c = delimiters.charCodeAt(i);
      var hasSurrogates = true;
    }
    if (m < c){
      m = c;
      count++;
    }
    maxDelimCodePoint = m;
    if (hasSurrogates) {
      delimiterCodePoints.add(count);
      for (var i = 0, j = 0; i < count; i++, j += charCount(c)) {
        c = delimiters.charCodeAt(j);
        delimiterCodePoints[i] = c;
      }
    }
	}
}

function hasMoreTokens(tokens){
  var newPosition = skipDelimiters(currentPosition);
  return (newPosition < maxPosition);
}

function skipDelimiters(currentPosition){
  var position = startPos;
  while (!retDelims && position < maxPosition) {
    if (!hasSurrogates) {
      var c = str.charAt(position);
      if ((c > maxDelimCodePoint) || (delimiters.indexOf(c) < 0)){
        break;
      }
          position++;
      } else {
        var c = str.charCodeAt(position);
        if ((c > maxDelimCodePoint) || !isDelimiter(c)) {
          break;
        }
        position += Character.charCount(c);
      }
    }
    return position;
}

function  isDelimiter(codePoint) {
  for (var i = 0; i < delimiterCodePoints.length; i++) {
    if (delimiterCodePoints[i] == codePoint) {
      return true;
    }
  }
return false;
}

function nextToken() {
    /*
     * If next position already computed in hasMoreElements() and
     * delimiters have changed between the computation and this invocation,
     * then use the computed value.
     */

    currentPosition = (newPosition >= 0 && !delimsChanged) ? newPosition : skipDelimiters(currentPosition);
    /* Reset these anyway */
    delimsChanged = false;
    newPosition = -1;
    var start = currentPosition;
    currentPosition = scanToken(currentPosition);
    return str.substr(start, currentPosition);
}


    /**
     * Skips ahead from startPos and returns the index of the next delimiter
     * character encountered, or maxPosition if no such delimiter is found.
     */
function scanToken (startPos) {
        var position = startPos;
        while (position < maxPosition) {
            if (!hasSurrogates) {
                var c = str.charAt(position);
                if ((c <= maxDelimCodePoint) && (delimiters.indexOf(c) >= 0)){
                  break;
                }
                  position++;
            } else {
                var c = str.charCodeAt(position);
                if ((c <= maxDelimCodePoint) && isDelimiter(c)){
                    break;
                }
                position += Character.charCount(c);
            }
        }
        if (retDelims && (startPos == position)) {
            if (!hasSurrogates) {
                var c = str.charAt(position);
                if ((c <= maxDelimCodePoint) && (delimiters.indexOf(c) >= 0)){
                    position++;
                }
              }else {
                var c = str.charCodeAt(position);
                if ((c <= maxDelimCodePoint) && isDelimiter(c))
                    position += Character.charCount(c);
            }
        }
        return position;
}

main();
