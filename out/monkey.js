(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["monkey"] = factory();
	else
		root["monkey"] = factory();
})(this || window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const monkey = __webpack_require__(/*! ../src/monkey */ "./src/monkey.js");
module.exports = monkey;
exports = module.exports;
exports.default = module.exports;


/***/ }),

/***/ "./src/ast.js":
/*!********************!*\
  !*** ./src/ast.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Program = exports.Program = function () {
  function Program() {
    _classCallCheck(this, Program);

    this.statements = [];
  }

  _createClass(Program, [{
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      if (this.statements.length) {
        return this.statements[0].tokenLiterial();
      } else {
        return '';
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      var str = '';
      for (var i = 0; i < this.statements.length; i++) {
        str += this.statements[i].toString();
      }
      return str;
    }
  }]);

  return Program;
}();

var LetStatement = exports.LetStatement = function () {
  function LetStatement() {
    _classCallCheck(this, LetStatement);
  }

  _createClass(LetStatement, [{
    key: 'statementNode',
    value: function statementNode() {}
  }, {
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      return this.token.Literial;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var str = this.tokenLiterial() + ' ' + this.name.toString() + ' = ';
      if (this.value) {
        str += this.value.toString() + ' ';
      }
      str += ';';
      return str;
    }
  }]);

  return LetStatement;
}();

var Identifier = exports.Identifier = function () {
  function Identifier(token, value) {
    _classCallCheck(this, Identifier);

    this.token = token;
    this.value = value;
  }

  _createClass(Identifier, [{
    key: 'expressionNode',
    value: function expressionNode() {}
  }, {
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      return this.token.Literial;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.value;
    }
  }]);

  return Identifier;
}();

var ReturnStatement = exports.ReturnStatement = function () {
  function ReturnStatement() {
    _classCallCheck(this, ReturnStatement);
  }

  _createClass(ReturnStatement, [{
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      return this.token.Literial;
    }
  }, {
    key: 'statementNode',
    value: function statementNode() {}
  }, {
    key: 'toString',
    value: function toString() {
      var str = this.tokenLiterial();
      if (this.returnValue) {
        str += this.returnValue.toString();
      }
      str += ';';
      return str;
    }
  }]);

  return ReturnStatement;
}();

var ExpressionStatement = exports.ExpressionStatement = function () {
  function ExpressionStatement() {
    _classCallCheck(this, ExpressionStatement);
  }

  _createClass(ExpressionStatement, [{
    key: 'statementNode',
    value: function statementNode() {}
  }, {
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      return this.token.Literial;
    }
  }, {
    key: 'toString',
    value: function toString() {
      if (this.expression) {
        return this.expression.toString();
      }
      return '';
    }
  }]);

  return ExpressionStatement;
}();

var IntegerLiteral = exports.IntegerLiteral = function () {
  function IntegerLiteral() {
    _classCallCheck(this, IntegerLiteral);
  }

  _createClass(IntegerLiteral, [{
    key: 'expressionNode',
    value: function expressionNode() {}
  }, {
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      return this.token.Literial;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.token.Literial;
    }
  }]);

  return IntegerLiteral;
}();

var PrefixExpression = exports.PrefixExpression = function () {
  function PrefixExpression() {
    _classCallCheck(this, PrefixExpression);
  }

  _createClass(PrefixExpression, [{
    key: 'expressionNode',
    value: function expressionNode() {}
  }, {
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      return this.token.Literial;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '(' + this.operator + this.right.toString() + ')';
    }
  }]);

  return PrefixExpression;
}();

var InfixExpression = exports.InfixExpression = function () {
  function InfixExpression() {
    _classCallCheck(this, InfixExpression);
  }

  _createClass(InfixExpression, [{
    key: 'expressionNode',
    value: function expressionNode() {}
  }, {
    key: 'tokenLiterial',
    value: function tokenLiterial() {
      return this.token.Literial;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '(' + this.left.toString() + ' ' + this.operator + ' ' + this.right.toString() + ')';
    }
  }]);

  return InfixExpression;
}();

/***/ }),

/***/ "./src/lexer.js":
/*!**********************!*\
  !*** ./src/lexer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lexer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = __webpack_require__(/*! ./token */ "./src/token.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isLiterial(ch) {
  return ch && ('a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z');
}

function isDigit(ch) {
  return ch && '0' <= ch && ch <= '9';
}

var Lexer = exports.Lexer = function () {
  function Lexer(input) {
    _classCallCheck(this, Lexer);

    this.input = input || '';
    this.position = this.readPosition = 0;
    this.readChar();
  }

  _createClass(Lexer, [{
    key: 'readChar',
    value: function readChar() {
      if (this.readPosition >= this.input.length) {
        this.ch = null;
      } else {
        this.ch = this.input[this.readPosition];
      }
      this.position = this.readPosition;
      this.readPosition += 1;
    }
  }, {
    key: 'peekChar',
    value: function peekChar() {
      if (this.readPosition >= this.input.length) {
        return null;
      }
      return this.input[this.readPosition];
    }
  }, {
    key: 'nextToken',
    value: function nextToken() {
      var tok = void 0;
      this.skipWhitespace();

      switch (this.ch) {
        case '=':
          if (this.peekChar() === '=') {
            var ch = this.ch;
            this.readChar();
            var literial = ch + this.ch;
            tok = (0, _token.generateToken)(_token.EQ, literial);
          } else {
            tok = (0, _token.generateToken)(_token.ASSIGN, this.ch);
          }
          break;
        case ';':
          tok = (0, _token.generateToken)(_token.SEMICOLON, this.ch);
          break;
        case '(':
          tok = (0, _token.generateToken)(_token.LPAREN, this.ch);
          break;
        case ')':
          tok = (0, _token.generateToken)(_token.RPAREN, this.ch);
          break;
        case ',':
          tok = (0, _token.generateToken)(_token.COMMA, this.ch);
          break;
        case '+':
          tok = (0, _token.generateToken)(_token.PLUS, this.ch);
          break;
        case '{':
          tok = (0, _token.generateToken)(_token.LBRACE, this.ch);
          break;
        case '}':
          tok = (0, _token.generateToken)(_token.RBRACE, this.ch);
          break;
        case '-':
          tok = (0, _token.generateToken)(_token.MINUS, this.ch);
          break;
        case '!':
          if (this.peekChar() === '=') {
            var _ch = this.ch;
            this.readChar();
            var _literial = _ch + this.ch;
            tok = (0, _token.generateToken)(_token.NOT_EQ, _literial);
          } else {
            tok = (0, _token.generateToken)(_token.BANG, this.ch);
          }
          break;
        case '/':
          tok = (0, _token.generateToken)(_token.SLASH, this.ch);
          break;
        case '*':
          tok = (0, _token.generateToken)(_token.ASTERISK, this.ch);
          break;
        case '<':
          tok = (0, _token.generateToken)(_token.LT, this.ch);
          break;
        case '>':
          tok = (0, _token.generateToken)(_token.GT, this.ch);
          break;
        case null:
          tok = (0, _token.generateToken)(_token.EOF);
          break;
        default:
          if (isLiterial(this.ch)) {
            var _literial2 = this.readIdentifier();
            tok = (0, _token.generateToken)((0, _token.lookupIdent)(_literial2), _literial2);
            return tok;
          } else if (isDigit(this.ch)) {
            tok = (0, _token.generateToken)(_token.INT, this.readNumber());
            return tok;
          } else {
            tok = (0, _token.generateToken)(_token.ILLEGAL, this.ch);
          }
      }
      this.readChar();
      return tok;
    }
  }, {
    key: 'readNumber',
    value: function readNumber() {
      var position = this.position;
      while (isDigit(this.ch)) {
        this.readChar();
      }
      return this.input.slice(position, this.position);
    }
  }, {
    key: 'readIdentifier',
    value: function readIdentifier() {
      var position = this.position;
      while (isLiterial(this.ch)) {
        this.readChar();
      }
      return this.input.slice(position, this.position);
    }
  }, {
    key: 'skipWhitespace',
    value: function skipWhitespace() {
      while (this.ch === ' ' || this.ch === '\t' || this.ch === '\n' || this.ch === '\r') {
        this.readChar();
      }
    }
  }]);

  return Lexer;
}();

/***/ }),

/***/ "./src/monkey.js":
/*!***********************!*\
  !*** ./src/monkey.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = exports.TokenTypes = exports.Lexer = undefined;

var _lexer = __webpack_require__(/*! ./lexer */ "./src/lexer.js");

Object.defineProperty(exports, 'Lexer', {
  enumerable: true,
  get: function get() {
    return _lexer.Lexer;
  }
});

var _parser = __webpack_require__(/*! ./parser */ "./src/parser.js");

Object.defineProperty(exports, 'Parser', {
  enumerable: true,
  get: function get() {
    return _parser.Parser;
  }
});

var _token = __webpack_require__(/*! ./token */ "./src/token.js");

var TokenTypes = exports.TokenTypes = {
  ASSIGN: _token.ASSIGN,
  SEMICOLON: _token.SEMICOLON,
  LPAREN: _token.LPAREN,
  RPAREN: _token.RPAREN,
  COMMA: _token.COMMA,
  PLUS: _token.PLUS,
  LBRACE: _token.LBRACE,
  RBRACE: _token.RBRACE,
  EOF: _token.EOF,
  IDENT: _token.IDENT,
  ILLEGAL: _token.ILLEGAL,
  INT: _token.INT,
  MINUS: _token.MINUS,
  BANG: _token.BANG,
  SLASH: _token.SLASH,
  ASTERISK: _token.ASTERISK,
  LT: _token.LT,
  GT: _token.GT,
  EQ: _token.EQ,
  NOT_EQ: _token.NOT_EQ
};

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _precedence;

var _lexer = __webpack_require__(/*! ./lexer */ "./src/lexer.js");

var lexer = _interopRequireWildcard(_lexer);

var _ast = __webpack_require__(/*! ./ast */ "./src/ast.js");

var ast = _interopRequireWildcard(_ast);

var _token = __webpack_require__(/*! ./token */ "./src/token.js");

var token = _interopRequireWildcard(_token);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LOWEST = 1;
var EQUALS = 2;
var LESSGREATER = 3;
var SUM = 4;
var PRODUCT = 5;
var PREFIX = 6;
var CALL = 7;

var precedence = (_precedence = {}, _defineProperty(_precedence, token.EQ, EQUALS), _defineProperty(_precedence, token.NOT_EQ, EQUALS), _defineProperty(_precedence, token.LT, LESSGREATER), _defineProperty(_precedence, token.GT, LESSGREATER), _defineProperty(_precedence, token.PLUS, SUM), _defineProperty(_precedence, token.MINUS, SUM), _defineProperty(_precedence, token.SLASH, PRODUCT), _defineProperty(_precedence, token.ASTERISK, PRODUCT), _precedence);

var Parser = exports.Parser = function () {
  function Parser(l) {
    _classCallCheck(this, Parser);

    this.errors = [];
    this.prefixParseFns = {};
    this.infixParseFns = {};
    this.l = l;
    this.registerPrefix(token.IDENT, this.parseIdentifier);
    this.registerPrefix(token.INT, this.parseIntegerLiteral);
    this.registerPrefix(token.BANG, this.parsePrefixExpression);
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

  _createClass(Parser, [{
    key: 'nextToken',
    value: function nextToken() {
      this.curToken = this.peekToken;
      this.peekToken = this.l.nextToken();
    }
  }, {
    key: 'noPrefixParseFnError',
    value: function noPrefixParseFnError(t) {
      this.errors.push('no parse function for token ' + t);
    }
  }, {
    key: 'registerPrefix',
    value: function registerPrefix(tokenType, fn) {
      this.prefixParseFns[tokenType] = fn;
    }
  }, {
    key: 'registerInfix',
    value: function registerInfix(tokenType, fn) {
      this.infixParseFns[tokenType] = fn;
    }
  }, {
    key: 'parsePrefixExpression',
    value: function parsePrefixExpression() {
      var expression = new ast.PrefixExpression();
      expression.token = this.curToken;
      expression.operator = this.curToken.Literial;
      this.nextToken();
      expression.right = this.parseExpression(PREFIX);
      return expression;
    }
  }, {
    key: 'peekPrecedence',
    value: function peekPrecedence() {
      var p = precedence[this.peekToken.Type];
      if (p !== undefined) {
        return p;
      }
      return LOWEST;
    }
  }, {
    key: 'curPrecedence',
    value: function curPrecedence() {
      var p = precedence[this.curToken.Type];
      if (p !== undefined) {
        return p;
      }
      return LOWEST;
    }
  }, {
    key: 'parseProgram',
    value: function parseProgram() {
      var program = new ast.Program();
      while (this.curToken.Type !== token.EOF) {
        var stmt = this.parseStatememt();
        if (stmt) {
          program.statements.push(stmt);
        }
        this.nextToken();
      }
      return program;
    }
  }, {
    key: 'parseIdentifier',
    value: function parseIdentifier() {
      return new ast.Identifier(this.curToken, this.curToken.Literial);
    }
  }, {
    key: 'parseStatememt',
    value: function parseStatememt() {
      switch (this.curToken.Type) {
        case token.LET:
          return this.parseLetStatement();
        case token.RETURN:
          return this.parseReturnStatement();
        default:
          return this.parseExpressionStatement();
      }
    }
  }, {
    key: 'parseLetStatement',
    value: function parseLetStatement() {
      var stmt = new ast.LetStatement();
      stmt.token = this.curToken;
      if (!this.expectPeek(token.IDENT)) {
        return;
      }
      stmt.name = new ast.Identifier(this.curToken, this.curToken.Literial);
      if (!this.expectPeek(token.ASSIGN)) {
        return;
      }
      // @TODO
      while (this.curToken.Type !== token.EOF && !this.curTokenIs(token.SEMICOLON)) {
        this.nextToken();
      }
      return stmt;
    }
  }, {
    key: 'parseReturnStatement',
    value: function parseReturnStatement() {
      var stmt = new ast.ReturnStatement();
      stmt.token = this.curToken;
      this.nextToken();

      // @TODO
      while (this.curToken.Type !== token.EOF && !this.curTokenIs(token.SEMICOLON)) {
        this.nextToken();
      }

      return stmt;
    }
  }, {
    key: 'expectPeek',
    value: function expectPeek(t) {
      if (this.peekTokenIs(t)) {
        this.nextToken();
        return true;
      } else {
        this.peekError(t);
        return false;
      }
    }
  }, {
    key: 'peekError',
    value: function peekError(t) {
      this.errors.push('expected next token to be ' + t + ' but got ' + this.peekToken.Type);
    }
  }, {
    key: 'peekTokenIs',
    value: function peekTokenIs(t) {
      return this.peekToken.Type === t;
    }
  }, {
    key: 'curTokenIs',
    value: function curTokenIs(t) {
      return this.curToken.Type === t;
    }
  }, {
    key: 'parseExpressionStatement',
    value: function parseExpressionStatement() {
      var stmt = new ast.ExpressionStatement();
      stmt.token = this.curToken;
      stmt.expression = this.parseExpression(LOWEST);
      return stmt;
    }
  }, {
    key: 'parseExpression',
    value: function parseExpression(precedence) {
      var prefix = this.prefixParseFns[this.curToken.Type];
      if (!prefix) {
        this.noPrefixParseFnError(this.curToken.Type);
        return null;
      }
      var leftExp = prefix();
      while (this.curToken.Type !== token.EOF && !this.curTokenIs(token.SEMICOLON) && precedence < this.peekPrecedence()) {
        var infix = this.infixParseFns[this.peekToken.Type];
        if (!infix) {
          return leftExp;
        }
        this.nextToken();
        leftExp = infix(leftExp);
      }
      return leftExp;
    }
  }, {
    key: 'parseIntegerLiteral',
    value: function parseIntegerLiteral() {
      var lit = new ast.IntegerLiteral();
      lit.token = this.curToken;
      lit.value = Number(this.curToken.Literial);
      return lit;
    }
  }, {
    key: 'parseInfixExpression',
    value: function parseInfixExpression(left) {
      var expression = new ast.InfixExpression();
      expression.token = this.curToken;
      expression.operator = this.curToken.Literial;
      expression.left = left;

      var precedence = this.curPrecedence();
      this.nextToken();
      expression.right = this.parseExpression(precedence);
      return expression;
    }
  }]);

  return Parser;
}();

/***/ }),

/***/ "./src/token.js":
/*!**********************!*\
  !*** ./src/token.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
exports.lookupIdent = lookupIdent;
function generateToken(tokenType) {
  var literial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return {
    Type: tokenType,
    Literial: literial
  };
}

var ILLEGAL = exports.ILLEGAL = 'ILLEGAL';
var EOF = exports.EOF = 'EOF';
var IDENT = exports.IDENT = 'ident';
var INT = exports.INT = 'int';
var ASSIGN = exports.ASSIGN = '=';
var PLUS = exports.PLUS = '+';
var COMMA = exports.COMMA = ',';
var SEMICOLON = exports.SEMICOLON = ';';
var LPAREN = exports.LPAREN = '(';
var RPAREN = exports.RPAREN = ')';
var LBRACE = exports.LBRACE = '{';
var RBRACE = exports.RBRACE = '}';
var FUNC = exports.FUNC = 'function';
var LET = exports.LET = 'let';
var MINUS = exports.MINUS = '-';
var BANG = exports.BANG = '!';
var ASTERISK = exports.ASTERISK = '*';
var SLASH = exports.SLASH = '/';
var LT = exports.LT = '<';
var GT = exports.GT = '>';
var TRUE = exports.TRUE = 'true';
var FALSE = exports.FALSE = 'false';
var IF = exports.IF = 'if';
var ELSE = exports.ELSE = 'else';
var RETURN = exports.RETURN = 'return';
var EQ = exports.EQ = '==';
var NOT_EQ = exports.NOT_EQ = '!=';

var keywords = exports.keywords = {
  fn: FUNC,
  let: LET,
  true: TRUE,
  false: FALSE,
  if: IF,
  else: ELSE,
  return: RETURN
};

function lookupIdent(ident) {
  var tokenType = keywords[ident];
  if (tokenType) {
    return tokenType;
  }
  return IDENT;
}

/***/ })

/******/ });
});
//# sourceMappingURL=monkey.js.map