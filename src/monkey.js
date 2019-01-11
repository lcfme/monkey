// @flow
export { Lexer } from './lexer';
import {
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
  INT,
  MINUS,
  BANG,
  SLASH,
  ASTERISK,
  LT,
  GT,
  EQ,
  NOT_EQ
} from './token';

export const TokenTypes = {
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
  INT,
  MINUS,
  BANG,
  SLASH,
  ASTERISK,
  LT,
  GT,
  EQ,
  NOT_EQ
};

export { Parser } from './parser';
