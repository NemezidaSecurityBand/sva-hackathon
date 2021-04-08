// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"etsM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMessage = sendMessage;
exports.onMessage = onMessage;
exports.isChromeBrowser = exports.$browser = void 0;

const _browser = () => {
  try {
    return browser || chrome;
  } catch (e) {
    return window['browser'] || window['chrome'];
  }
};

const _isChrome = () => {
  return !!browser && !!chrome;
};

const $browser = chrome; // export const $browser = _browser();

exports.$browser = $browser;
const isChromeBrowser = true;
exports.isChromeBrowser = isChromeBrowser;
console.log('isChrome', isChromeBrowser);

async function sendMessage(message) {
  if (isChromeBrowser) {
    return new Promise(resolve => {
      $browser.runtime.sendMessage(message, resolve);
    });
  } else {
    return $browser.runtime.sendMessage(message);
  }
}

function onMessage(handler) {
  $browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const result = handler(request, sender);

    if (result instanceof Promise) {
      result.then(sendResponse);
      return true; // Will respond asynchronously
    }

    sendResponse(result);
  });
}
},{}],"YSu3":[function(require,module,exports) {
"use strict";

var _browser = require("./utils/browser");

// dontRun();
scanViruses();

async function scanViruses() {
  const url = window.location.origin;
  console.log('SCAN', url);

  if (url.startsWith('https://httpbin.org')) {
    const r = await (0, _browser.sendMessage)({
      contentScriptQuery: 'virusReport',
      url: url
    });
    console.log('SCAN', r);
  }
}

function dontRun() {
  const host = document.createElement('div');
  document.body.insertAdjacentElement('beforebegin', host);
  const $root = host.attachShadow({
    mode: "open"
  });
  updatePanel();

  function updatePanel(code = '---') {
    const contentHTML = `<style lang="scss">
      .title {
        position: fixed;
        background-color: #fff8;
        padding: 1em;
        color: green;
        font-weight: 600;
        z-index: 10000;
      }
    </style>
    
    <div class="title">HELLO FROM EXTENSION: ${code}</div>
    `;
    $root.innerHTML = contentHTML;
  }
}
},{"./utils/browser":"etsM"}]},{},["YSu3"], null)
//# sourceMappingURL=/content-script.js.map