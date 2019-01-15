// @flow

import type { Token } from './token';
export interface Node {
  tokenLiterial(): ?string;
  toString(): string;
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
  tokenLiterial(): ?string {
    if (this.statements.length) {
      return this.statements[0].tokenLiterial();
    } else {
      return '';
    }
  }
  toString() {
    let str = '';
    for (let i = 0; i < this.statements.length; i++) {
      str += this.statements[i].toString();
    }
    return str;
  }
}

export class LetStatement implements Statement {
  token: Token;
  name: Identifier;
  value: Expression;
  statementNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    let str = this.tokenLiterial() + ' ' + this.name.toString() + ' = ';
    if (this.value) {
      str += this.value.toString() + ' ';
    }
    str += ';';
    return str;
  }
}

export class Identifier implements Expression {
  token: Token;
  value: string;
  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }
  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    return this.value;
  }
}

export class ReturnStatement implements Statement {
  token: Token;
  returnValue: Expression;
  tokenLiterial(): string {
    return this.token.Literial;
  }
  statementNode() {}
  toString(): string {
    let str = this.tokenLiterial();
    if (this.returnValue) {
      str += this.returnValue.toString();
    }
    str += ';';
    return str;
  }
}

export class ExpressionStatement implements Statement {
  token: Token;
  expression: ?Expression;
  statementNode() {}
  tokenLiterial() {
    return this.token.Literial;
  }
  toString(): string {
    if (this.expression) {
      return this.expression.toString();
    }
    return '';
  }
}

export class IntegerLiteral implements Expression {
  token: Token;
  value: number;
  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    return this.token.Literial;
  }
}

export class PrefixExpression implements Expression {
  token: Token;
  operator: string;
  right: Expression;
  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    return '(' + this.operator + this.right.toString() + ')';
  }
}

export class InfixExpression implements Expression {
  token: Token;
  left: Expression;
  operator: string;
  right: Expression;
  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    return (
      '(' +
      this.left.toString() +
      ' ' +
      this.operator +
      ' ' +
      this.right.toString() +
      ')'
    );
  }
}

export class Bool implements Expression {
  token: Token;
  value: boolean;

  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    return this.token.Literial;
  }
}

export class IfExpression implements Expression {
  token: Token;
  condition: Expression;
  consequence: BlockStatement;
  alternative: ?BlockStatement;
  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    let str =
      'if ' + this.condition.toString() + ' ' + this.consequence.toString();
    if (this.alternative) {
      str += ' else ' + this.alternative.toString();
    }
    return str;
  }
}

export class BlockStatement implements Statement {
  token: Token;
  statements: Array<Statement>;
  constructor() {
    this.statements = [];
  }
  statementNode() {}
  tokenLiterial() {
    return this.token.Literial;
  }
  toString() {
    return this.statements.map(i => i.toString()).join('');
  }
}

export class FunctionLiteral implements Expression {
  token: Token;
  parameters: Array<Identifier>;
  body: BlockStatement;
  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    let str = this.tokenLiterial();
    str += ' (';
    str += this.parameters.map(i => i.toString()).join(',');
    str += ')';
    str += this.body.toString();
    return str;
  }
}

export class CallExpression implements Expression {
  token: Token;
  function: Expression;
  arguments: Array<Expression>;
  expressionNode() {}
  tokenLiterial(): string {
    return this.token.Literial;
  }
  toString(): string {
    return (
      this.tokenLiterial() +
      '(' +
      this.arguments.map(i => i.toString()).join(',') +
      ')'
    );
  }
}
