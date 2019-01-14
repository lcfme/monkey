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

const precedence: { [k: any]: number } = {
  [token.EQ]: EQUALS,
  [token.NOT_EQ]: EQUALS,
  [token.LT]: LESSGREATER,
  [token.GT]: LESSGREATER,
  [token.PLUS]: SUM,
  [token.MINUS]: SUM,
  [token.SLASH]: PRODUCT,
  [token.ASTERISK]: PRODUCT
};

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
    this.prefixParseFns = {};
    this.infixParseFns = {};
    this.l = l;
    this.registerPrefix(token.IDENT, this.parseIdentifier);
    this.registerPrefix(token.INT, this.parseIntegerLiteral);
    this.registerPrefix(token.BANG, this.parsePrefixExpression);
    this.registerPrefix(token.MINUS, this.parsePrefixExpression);
    this.registerInfix(token.PLUS, this.parseInfixExpression);
    this.registerInfix(token.MINUS, this.parseInfixExpression);
    this.registerInfix(token.SLASH, this.parseInfixExpression);
    this.registerInfix(token.ASTERISK, this.parseInfixExpression);
    this.registerInfix(token.EQ, this.parseInfixExpression);
    this.registerInfix(token.NOT_EQ, this.parseInfixExpression);
    this.registerInfix(token.LT, this.parseInfixExpression);
    this.registerInfix(token.GT, this.parseInfixExpression);
    this.nextToken();
    this.nextToken();
  }
  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }
  noPrefixParseFnError(t: token.TokenType) {
    this.errors.push('no parse function for token ' + t);
  }
  registerPrefix(tokenType: token.TokenType, fn: prefixParseFn) {
    this.prefixParseFns[tokenType] = fn;
  }
  registerInfix(tokenType: token.TokenType, fn: infixParseFn) {
    this.infixParseFns[tokenType] = fn;
  }
  parsePrefixExpression(): ast.Expression {
    const expression = new ast.PrefixExpression();
    expression.token = this.curToken;
    expression.operator = this.curToken.Literial;
    this.nextToken();
    expression.right = ((this.parseExpression(
      PREFIX
    ): any): ast.PrefixExpression);
    return expression;
  }
  peekPrecedence(): number {
    const p = precedence[this.peekToken.Type];
    if (p !== undefined) {
      return p;
    }
    return LOWEST;
  }
  curPrecedence(): number {
    const p = precedence[this.curToken.Type];
    if (p !== undefined) {
      return p;
    }
    return LOWEST;
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
      this.noPrefixParseFnError(this.curToken.Type);
      return null;
    }
    let leftExp = prefix();
    while (
      this.curToken.Type !== token.EOF &&
      !this.curTokenIs(token.SEMICOLON) &&
      precedence < this.peekPrecedence()
    ) {
      const infix = this.infixParseFns[this.peekToken.Type];
      if (!infix) {
        return leftExp;
      }
      this.nextToken();
      leftExp = infix(leftExp);
    }
    return leftExp;
  }
  parseIntegerLiteral(): ast.Expression {
    const lit = new ast.IntegerLiteral();
    lit.token = this.curToken;
    lit.value = Number(this.curToken.Literial);
    return lit;
  }
  parseInfixExpression(left: ast.Expression): ast.Expression {
    const expression = new ast.InfixExpression();
    expression.token = this.curToken;
    expression.operator = this.curToken.Literial;
    expression.left = left;

    const precedence = this.curPrecedence();
    this.nextToken();
    expression.right = ((this.parseExpression(
      precedence
    ): any): ast.Expression);
    return expression;
  }
}
