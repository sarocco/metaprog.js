[>(function funcion() {
  var ast1 = [<1+2>];
  var ast2 = [<x*y>];
  ast1.expression.operator = ast2.expression.operator;
  return ast1;
})()<]

//Esto tiene que devolver 1*2 = 2
