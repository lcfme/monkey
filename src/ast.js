// @flow

import type { Token } from './token';
export interface Node {
  tokenLiterial(): string;
}

export interface Statement extends Node {
  statementNode(): void;
}

export interface Expression extends Node {
  expressionNode(): void;
}

export class Program {
  statements: Array<Statement>;
  constructor() {
    this.statements = [];
  }
  tokenLiterial(): string {
    if (this.statements.length) {
      return this.statements[0].tokenLiterial();
    } else {
      return '';
    }
  }
}

export class LetStatement implements Statement {
  token: Token;
  name: Identifier;
  value: Expression;
  constructor() {}
  statementNode() {}
  tokenLiterial(): string {
    return ((this.token.Literial: any): string);
  }
}

export class Identifier implements Expression {
  token: Token;
  value: ?string;
  constructor(token: Token, value: ?string) {
    this.token = token;
    this.value = value;
  }
  expressionNode() {}
  tokenLiterial(): string {
    return ((this.token.Literial: any): string);
  }
}
