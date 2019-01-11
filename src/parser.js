// @flow

import * as lexer from './lexer';
import * as ast from './ast';
import * as token from './token';

const LOWEST = 1;
const EQUALS = 2;
const LESSGREATER = 3;
const SUM = 4;
const PRODUCT = 5;
const PREFIX = 6;
const CALL = 7;

type prefixParseFn = () => ast.Expression;
type infixParseFn = ast.Expression => ast.Expression;

export class Parser {
  l: lexer.Lexer;
  curToken: token.Token;
  peekToken: token.Token;
  errors: Array<string>;
  prefixParseFns: { [k: token.TokenType]: prefixParseFn };
  infixParseFns: { [k: token.TokenType]: infixParseFn };
  constructor(l: lexer.Lexer) {
    this.errors = [];
    this.l = l;
    this.registerPrefix(token.IDENT, this.parseIdentifier);
    this.nextToken();
    this.nextToken();
  }
  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }
  registerPrefix(tokenType: token.TokenType, fn: prefixParseFn) {
    this.prefixParseFns[tokenType] = fn;
  }
  registerInfix(tokenType: token.TokenType, fn: infixParseFn) {
    this.infixParseFns[tokenType] = fn;
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
  parseIdentifier(): ast.Expression {
    return new ast.Identifier(this.curToken, this.curToken.Literial);
  }
  parseStatememt(): ?ast.Statement {
    switch (this.curToken.Type) {
      case token.LET:
        return this.parseLetStatement();
      case token.RETURN:
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement();
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
    while (
      this.curToken.Type !== token.EOF &&
      !this.curTokenIs(token.SEMICOLON)
    ) {
      this.nextToken();
    }
    return stmt;
  }
  parseReturnStatement(): ast.ReturnStatement {
    const stmt = new ast.ReturnStatement();
    stmt.token = this.curToken;
    this.nextToken();

    // @TODO
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

  parseExpressionStatement(): ast.ExpressionStatement {
    const stmt = new ast.ExpressionStatement();
    stmt.token = this.curToken;
    stmt.expression = this.parseExpression(LOWEST);
    return stmt;
  }
  parseExpression(precedence: number): ?ast.Expression {
    const prefix = this.prefixParseFns[this.curToken.Type];
    if (!prefix) {
      return null;
    }
    const leftExp = prefix();
    return leftExp;
  }
}
