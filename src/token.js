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
export const MINUS = '-';
export const BANG = '!';
export const ASTERISK = '*';
export const SLASH = '/';
export const LT = '<';
export const GT = '>';
export const TRUE = 'true';
export const FALSE = 'false';
export const IF = 'if';
export const ELSE = 'else';
export const RETURN = 'return';
export const EQ = '==';
export const NOT_EQ = '!=';


export const keywords = {
  fn: FUNC,
  let: LET,
  true: TRUE,
  false: FALSE,
  if: IF,
  else: ELSE,
  return: RETURN
};

export function lookupIdent(ident: string) {
  const tokenType = keywords[ident];
  if (tokenType) {
    return tokenType;
  }
  return IDENT;
}
