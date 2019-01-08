// @flow

import {
  generateToken,
  ASSIGN,
  SEMICOLON,
  LPAREN,
  RPAREN,
  COMMA,
  PLUS,
  LBRACE,
  RBRACE,
  EOF,
  IDENT,
  ILLEGAL,
  lookupIdent,
  INT
} from './token';
import type { Token } from './token';

function isLiterial(ch: any): boolean {
  return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z');
}

function isDigit(ch: any): boolean {
  return '0' <= ch && ch <= '9';
}

export class Lexer {
  input: string;
  position: number;
  readPosition: number;
  ch: string | void;
  constructor(input: string) {
    this.input = input || '';
    this.position = this.readPosition = 0;
    this.readChar();
  }
  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = undefined;
    } else {
      this.ch = this.input[this.readPosition++];
    }
    this.position = this.readPosition;
  }
  nextToken(): Token {
    let tok: Token;
    this.skipWhitespace();

    switch (this.ch) {
      case '=':
        tok = generateToken(ASSIGN, this.ch);
        break;
      case ';':
        tok = generateToken(SEMICOLON, this.ch);
        break;
      case '(':
        tok = generateToken(LPAREN, this.ch);
        break;
      case ')':
        tok = generateToken(RPAREN, this.ch);
        break;
      case ',':
        tok = generateToken(COMMA, this.ch);
        break;
      case '+':
        tok = generateToken(PLUS, this.ch);
        break;
      case '{':
        tok = generateToken(LBRACE, this.ch);
        break;
      case '}':
        tok = generateToken(RBRACE, this.ch);
        break;
      case undefined:
        tok = generateToken(EOF);
        break;
      default:
        if (isLiterial(this.ch)) {
          const literial = this.readIdentifier();
          tok = generateToken(lookupIdent(literial), literial);
          return tok;
        } else if (isDigit(this.ch)) {
          tok = generateToken(INT, this.readNumber());
          return tok;
        } else {
          tok = generateToken(ILLEGAL, this.ch);
        }
    }
    this.readChar();
    return ((tok: any): Token);
  }
  readNumber(): string {
    const position = this.position;
    while (isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
  readIdentifier(): string {
    const position = this.position;
    while (isLiterial(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
  skipWhitespace() {
    while (
      this.ch === ' ' ||
      this.ch === '\t' ||
      this.ch === '\n' ||
      this.ch === '\r'
    ) {
      this.readChar();
    }
  }
}