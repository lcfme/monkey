(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Monkey"] = factory();
	else
		root["Monkey"] = factory();
})(window, function() {
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

const Monkey = __webpack_require__(/*! ../src/lexer */ "./src/lexer.js");

module.exports = Monkey.default;

exports = module.exports;

exports.default = module.exports;


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
  return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z';
}

function isDigit(ch) {
  return '0' <= ch && ch <= '9';
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
        this.ch = undefined;
      } else {
        this.ch = this.input[this.readPosition++];
      }
      this.position = this.readPosition;
    }
  }, {
    key: 'nextToken',
    value: function nextToken() {
      var tok = void 0;
      this.skipWhitespace();

      switch (this.ch) {
        case '=':
          tok = (0, _token.generateToken)(_token.ASSIGN, this.ch);
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
        case undefined:
          tok = (0, _token.generateToken)(_token.EOF);
          break;
        default:
          if (isLiterial(this.ch)) {
            var literial = this.readIdentifier();
            tok = (0, _token.generateToken)((0, _token.lookupIdent)(literial), literial);
            return tok;
          } else if (isDigit(this.ch)) {} else {
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
function generateToken(tokenType, literial) {
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

var keywords = exports.keywords = {
  fn: FUNC,
  let: LET
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