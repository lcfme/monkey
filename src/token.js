// @flow
export type TokenType = string;

export interface Token {
  Type: TokenType;
  Literial: string | void;
}

export function generateToken(tokenType: TokenType, literial?: string): Token {
  return {
    Type: tokenType,
    Literial: literial
  };
}

export const ILLEGAL = 'ILLEGAL';
export const EOF = 'EOF';
export const IDENT = 'ident';
export const INT = 'int';
export const ASSIGN = '=';
export const PLUS = '+';
export const COMMA = ',';
export const SEMICOLON = ';';
export const LPAREN = '(';
export const RPAREN = ')';
export const LBRACE = '{';
export const RBRACE = '}';
export const FUNC = 'function';
export const LET = 'let';

export const keywords = {
  fn: FUNC,
  let: LET
};

export function lookupIdent(ident: string) {
  const tokenType = keywords[ident];
  if (tokenType) {
    return tokenType;
  }
  return IDENT;
}
