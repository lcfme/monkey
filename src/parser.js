// @flow

import * as lexer from './lexer';
import * as ast from './ast';
import * as token from './token';

class Parser {
  l: lexer.Lexer;
  curToken: token.Token;
  peekToken: token.Token;
  constructor(l: lexer.Lexer) {
    this.l = l;
    this.nextToken();
    this.nextToken();
  }
  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }
  parseProgram(): ast.Program {
    const program = new ast.Program();
    while (this.curToken.Type !== token.EOF) {
      const stmt = this.parseStatememt();
      if (stmt) {
        program.statements.push(stmt);
      }
      this.nextToken();
    }
    return program;
  }
  parseStatememt(): ?ast.Statement {
    switch (this.curToken.Type) {
      case token.LET:
        return this.parseLetStatement();
      default:
        return null;
    }
  }
  parseLetStatement(): ast.LetStatement {
    const stmt = new ast.LetStatement();
    stmt.token = this.curToken;
    if (!this.expectPeek(token.IDENT)) {
    }
    return stmt;
  }
  expectPeek(t: token.TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    } else {
      return false;
    }
  }
  peekTokenIs(t: token.TokenType): boolean {
    return this.peekToken.Type === t;
  }
}
