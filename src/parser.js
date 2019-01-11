// @flow

import * as lexer from './lexer';
import * as ast from './ast';
import * as token from './token';

export class Parser {
  l: lexer.Lexer;
  curToken: token.Token;
  peekToken: token.Token;
  errors: Array<string>;
  constructor(l: lexer.Lexer) {
    this.errors = [];
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
    debugger;
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
  parseLetStatement(): ?ast.LetStatement {
    const stmt = new ast.LetStatement();
    stmt.token = this.curToken;
    if (!this.expectPeek(token.IDENT)) {
      return;
    }
    stmt.name = new ast.Identifier(this.curToken, this.curToken.Literial);
    if (!this.expectPeek(token.ASSIGN)) {
      return;
    }
    // @TODO
debugger;
    while (
      this.curToken.Type !== token.EOF &&
      !this.curTokenIs(token.SEMICOLON)
    ) {
      this.nextToken();
    }
    return stmt;
  }
  expectPeek(t: token.TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    } else {
      this.peekError(t);
      return false;
    }
  }

  peekError(t: token.TokenType) {
    this.errors.push(
      `expected next token to be ${t} but got ${this.peekToken.Type}`
    );
  }
  peekTokenIs(t: token.TokenType): boolean {
    return this.peekToken.Type === t;
  }
  curTokenIs(t: token.TokenType): boolean {
    return this.curToken.Type === t;
  }
}
