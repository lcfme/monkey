var readline = require('readline');
var Monkey = require('../out/monkey');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(input) {
  if (input === 'exit') {
    rl.close();
  }
  var lexer = new Monkey.Lexer(input);
  for (
    var tok = lexer.nextToken();
    tok.Type !== Monkey.TokenTypes.EOF;
    tok = lexer.nextToken()
  ) {
    console.log(tok);
  }
});
