/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bigCookie = __webpack_require__(1);

var _bigCookie2 = _interopRequireDefault(_bigCookie);

var _producer = __webpack_require__(2);

var _producer2 = _interopRequireDefault(_producer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(3);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.allCookies = 0;
    this.renderProducersTime = 250; // ms
    this.renderBigCookieTime = 100; // ms
    this.saveDataBtn = document.getElementById("save-data");
    this.listOfProducers = [];
    this.multipliers = [1, 20.303718238, 7828749.671335188];
    // multipliers from cookieclicker doc
    this.multipleIndex = 0; // 0 -> 1, 1->10, 2->100
    this.init = this.init.bind(this);
  }

  _createClass(Game, [{
    key: "init",
    value: function () {
      function init() {
        var _this = this;

        this.saveDataBtn.addEventListener("click", this.saveDataToIndexedDB);

        // Add Render of Big Cookie by Interval every "game.renderBigCookieTime" ms
        setInterval(function () {
          _bigCookie2["default"].render(_this.getAmountOfCookies());
          _bigCookie2["default"].renderCookiesPerSec(_this.howManyCookiesWeProducePerSec());
          _this.renderTitleOfBrowser();
        }, this.renderBigCookieTime);

        // Add bigCookie Onclick Event Listener
        _bigCookie2["default"].DOMelem.addEventListener("click", function () {
          _this.incrementCookies();
        });
        // Add OnClick Event to all Producers
        (function () {
          _this.listOfProducers.forEach(function (producer) {
            producer.DOMelem.addEventListener("click", function () {
              if (_this.decrementCookies(producer.cost)) {
                var multiple = _this.multipleIndex === 0 ? 1 : Math.pow(10, _this.multipleIndex);
                producer.addOwner(multiple, _this.multipliers[_this.multipleIndex]);
                producer.render(_this.getAmountOfCookies(), _this.multipliers[_this.multipleIndex]);
                _this.addInterval(producer, producer.perSecond);
              }
            });
          });
        })();
        // Render List of All Producers
        var renderListOfProducers = function () {
          function renderListOfProducers() {
            _this.listOfProducers.forEach(function (producer) {
              producer.render(_this.getAmountOfCookies(), _this.multipliers[_this.multipleIndex]);
            });
          }

          return renderListOfProducers;
        }();
        // render List of All Producers every "renderProducersTime" miliseconds
        setInterval(renderListOfProducers, this.renderProducersTime);

        // Render Store buttons -> Buy 1 10 100
        document.getElementById("store1").addEventListener("click", function () {
          _this.multipleIndex = 0;
        });
        document.getElementById("store10").addEventListener("click", function () {
          _this.multipleIndex = 1;
        });
        document.getElementById("store100").addEventListener("click", function () {
          _this.multipleIndex = 2;
        });
      }

      return init;
    }()
  }, {
    key: "getAmountOfCookies",
    value: function () {
      function getAmountOfCookies() {
        return Math.floor(this.allCookies);
      }

      return getAmountOfCookies;
    }()
  }, {
    key: "incrementCookies",
    value: function () {
      function incrementCookies() {
        var incrAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        this.allCookies = Math.floor((this.allCookies + incrAmount) * 100) / 100;
      }

      return incrementCookies;
    }()
  }, {
    key: "decrementCookies",
    value: function () {
      function decrementCookies() {
        var decrAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        if (this.allCookies >= decrAmount * this.multipliers[this.multipleIndex]) {
          this.allCookies -= decrAmount;
          return true;
        }
        return false;
      }

      return decrementCookies;
    }()
  }, {
    key: "renderTitleOfBrowser",
    value: function () {
      function renderTitleOfBrowser() {
        document.title = String(Math.floor(this.allCookies).toLocaleString()) + " cookies";
      }

      return renderTitleOfBrowser;
    }()
  }, {
    key: "howManyCookiesWeProducePerSec",
    value: function () {
      function howManyCookiesWeProducePerSec() {
        var sum = 0;
        this.listOfProducers.forEach(function (producer) {
          sum += Math.floor(producer.perSecond * producer.owned * 10) / 10;
        });
        return sum;
      }

      return howManyCookiesWeProducePerSec;
    }()
  }, {
    key: "addInterval",
    value: function () {
      function addInterval(producerName, howManyCookiesAdd) {
        var _this2 = this;

        var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

        var multiple = this.multipleIndex === 0 ? 1 : Math.pow(10, this.multipleIndex);
        for (var i = 0; i < multiple; i += 1) {
          producerName.intervals.push(setInterval(function () {
            // Math.floor because it does not show vaild perSec
            // value of cursor which is incremented by 0.1
            var prepareVal = producerName.howManyProduced + producerName.perSecond;
            producerName.howManyProduced = Math.floor(prepareVal * 100) / 100;
            _this2.incrementCookies(howManyCookiesAdd);
          }, time));
        }
      }

      return addInterval;
    }()
  }, {
    key: "saveDataToIndexedDB",
    value: function () {
      function saveDataToIndexedDB() {
        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        // Open (or create) the database
        var open = indexedDB.open("MyCookieStore", 1);

        // Create the schema
        open.onupgradeneeded = function () {
          var db = open.result;
          db.createObjectStore("SaveGame", { keyPath: "id" });
        };
        open.onsuccess = function () {
          // Start a new transaction
          var db = open.result;
          var tx = db.transaction("SaveGame", "readwrite");
          var store = tx.objectStore("SaveGame");
          // Add some data
          var obj = [];
          game.listOfProducers.forEach(function (prod) {
            var baseCost = prod.baseCost,
                cost = prod.cost,
                howManyProduced = prod.howManyProduced,
                isAvailable = prod.isAvailable,
                name = prod.name,
                owned = prod.owned,
                perSec = prod.perSec;

            obj.push({
              baseCost: baseCost, cost: cost, howManyProduced: howManyProduced, isAvailable: isAvailable, name: name, owned: owned, perSec: perSec
            });
          });
          store.put({
            id: 12345,
            game: { allCookies: game.allCookies },
            listOfProducers: obj
          });

          // Close the db when the transaction is done
          tx.oncomplete = function () {
            db.close();
          };
        };
      }

      return saveDataToIndexedDB;
    }()
  }, {
    key: "readDataFromIndexedDB",
    value: function () {
      function readDataFromIndexedDB() {
        var _this3 = this;

        // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        // Open (or create) the database
        var open = indexedDB.open("MyCookieStore", 1);
        // Create the schema
        open.onupgradeneeded = function () {
          var db = open.result;
          db.createObjectStore("SaveGame", { keyPath: "id" });
        };
        open.onsuccess = function () {
          // Start a new transaction
          var db = open.result;
          var tx = db.transaction("SaveGame");
          var store = tx.objectStore("SaveGame");
          // Query the data
          var getData = store.get(12345);
          getData.onsuccess = function () {
            var data = getData.result; // => "John"
            if (!data) {
              return;
            }
            game.allCookies = data.game.allCookies;
            // update values of ech Producers. Values updated -> owned, howManyProduced
            game.listOfProducers.forEach(function (producer, index) {
              if (producer.name === data.listOfProducers[index].name) {
                var _data$listOfProducers = data.listOfProducers[index],
                    owned = _data$listOfProducers.owned,
                    howManyProduced = _data$listOfProducers.howManyProduced;

                producer.owned = owned;
                producer.howManyProduced = howManyProduced;
              }
            });
            // Add intervals for every Producer
            game.listOfProducers.forEach(function (producer) {
              for (var i = 0; i < producer.owned; i += 1) {
                _this3.addInterval(producer, producer.perSecond, 1000);
              }
            });
          };
          // Close the db when the transaction is done
          tx.oncomplete = function () {
            db.close();
          };
        };
      }

      return readDataFromIndexedDB;
    }()
  }]);

  return Game;
}();
// Initialize
// constructor -> DOMid, name, baseCost, perSecond, owned, howManyProduced


var cursor = new _producer2["default"]("producer-cursor", "Cursor", 15, 0.1);
var grandma = new _producer2["default"]("producer-grandma", "Grandma", 100, 1);
var farm = new _producer2["default"]("producer-farm", "Farm", 1100, 8);
var mine = new _producer2["default"]("producer-mine", "Mine", 12000, 47);
var game = new Game();

// Add every producer to List of Producers Array
// to have an easy access to list of Producers
game.listOfProducers.push(cursor);
game.listOfProducers.push(grandma);
game.listOfProducers.push(farm);
game.listOfProducers.push(mine);

//document.addEventListener("DOMContentLoaded", game.init);
game.readDataFromIndexedDB();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bigCookie = {
  DOMelem: document.getElementById("big-cookie"),
  amount: document.getElementById("amountOfCookies"),
  allCookiesProducePerSec: document.getElementById("all-cookies-per-sec"),
  renderCookiesPerSec: function () {
    function renderCookiesPerSec(amount) {
      this.allCookiesProducePerSec.innerHTML = amount.toLocaleString();
    }

    return renderCookiesPerSec;
  }(),

  render: function () {
    function render(howMany) {
      bigCookie.amount.innerHTML = howMany.toLocaleString();
    }

    return render;
  }()
};
bigCookie.DOMelem = document.getElementById("big-cookie");
exports["default"] = bigCookie;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Producer = function () {
  function Producer(DOMid, name, baseCost, perSecond, owned, howManyProduced) {
    _classCallCheck(this, Producer);

    this.DOMelem = document.getElementById(DOMid);
    this.name = name || "";
    this.baseCost = baseCost || 0;
    this.cost = baseCost;
    this.perSecond = perSecond || 1;
    this.owned = owned || 0;
    this.howManyProduced = howManyProduced || 0;
    this.isAvailable = false;
    this.intervals = [];
  }

  _createClass(Producer, [{
    key: "render",
    value: function () {
      function render() {
        var cookiesAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var multiplePrice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        var content = "\n    <span class=\"name\">Name:" + String(this.name) + "</span>\n    <span class=\"price\">*" + String(Math.ceil(this.cost * multiplePrice).toLocaleString()) + "</span>\n    <span class=\"owned\">Owned:" + String(this.owned.toLocaleString()) + "</span>\n    <span class=\"produced\">Produced:" + String(Math.floor(this.howManyProduced).toLocaleString()) + "</span>\n    <span class=\"per-sec\">perSec: " + Math.floor(this.perSecond * this.owned * 10) / 10 + "</span>\n    ";
        this.DOMelem.innerHTML = content;

        if (cookiesAmount >= this.cost * multiplePrice) {
          this.DOMelem.style.opacity = 1;
          this.isAvailable = true;
        } else {
          this.DOMelem.style.opacity = 0.6;
          this.isAvailable = false;
        }
      }

      return render;
    }()
  }, {
    key: "addOwner",
    value: function () {
      function addOwner() {
        var multiple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        this.owned += multiple;
        this.cost = Math.ceil(this.baseCost * Math.pow(1.15, this.owned));
      }

      return addOwner;
    }()
  }]);

  return Producer;
}();

exports["default"] = Producer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "#container{\r\n  display: flex;\r\n  flex-wrap: nowrap ;\r\n  background-color: green;\r\n}\r\n#left, #right, #bottom {\r\n  display: flex;\r\n  width: 32.67%;\r\n  height: auto;\r\n  background-color: gray;\r\n}\r\n#right {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n#left-separator, #right-seperator {\r\n  background-color: black;\r\n  width:1%;\r\n  height:100%;\r\n}\r\n#big-cookie-container {\r\n  position: relative;\r\n  width: 100%;\r\n  padding: 10%;\r\n}\r\n#big-cookie {\r\n  position: absolute;\r\n  top: 6em;\r\n  left: 7em;\r\n  width: 235px;\r\n  height: 41%;\r\n  background: url(" + __webpack_require__(6) + ") no-repeat;\r\n  \r\n  background-size: 235px;\r\n  background-color: red;\r\n  border-radius: 127px;\r\n  cursor: pointer;\r\n\r\n}\r\n.producer {\r\n  display: flex;\r\n  position: relative;\r\n  width:100%;\r\n  background: url(" + __webpack_require__(7) + ") no-repeat center;\r\n  background-size:100%;\r\n  padding: 21px 0;\r\n  height:50px;\r\n}\r\n.producer > span {\r\n  display: flex;\r\n  flex-direction: row;\r\n  flex-wrap: nowrap;\r\n  cursor: pointer;\r\n  padding: 1px;\r\n}\r\n.name {\r\n  position: absolute;\r\n  top:1em;\r\n  left:10em;\r\n}\r\n.price {\r\n  position: absolute;\r\n  top:1em;\r\n  left:20em;\r\n}\r\n.owned {\r\n  position: absolute;\r\n  top:1em;\r\n  right:1em;\r\n}\r\n.produced {\r\n  position: absolute;\r\n  top:2em;\r\n  left:1em;\r\n}\r\n.per-sec {\r\n  position: absolute;\r\n  top:1em;\r\n  left:3em;\r\n}\r\n.active {\r\n  font-weight: bold;\r\n}\r\n#save-data {\r\n  background-color: red;\r\n  width:100px;\r\n  height:50px;\r\n}\r\n.noselect {\r\n  -webkit-touch-callout: none; /* iOS Safari */\r\n    -webkit-user-select: none; /* Safari */\r\n     -khtml-user-select: none; /* Konqueror HTML */\r\n       -moz-user-select: none; /* Firefox */\r\n        -ms-user-select: none; /* Internet Explorer/Edge */\r\n            user-select: none; /* Non-prefixed version, currently\r\n                                  supported by Chrome and Opera */\r\n}\r\n\r\n#buy-sell-mode {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 0 1em;\r\n}\r\n.buy-sell-con {\r\n  display: inline-block;\r\n}\r\n#buy, #sell {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin: 0.5em;\r\n  top: 0px;\r\n  left: 0px;\r\n  width: 47px;\r\n  height: 20px;\r\n  background-color: red;\r\n  cursor: pointer;\r\n}\r\n#store1, #store10, #store100 {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 50px;\r\n  height:30px;\r\n  background-color: red;\r\n  cursor: pointer;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "088a4bcd5a09f931db4a98789f7aadea.png";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/jpg;base64,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"

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);