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
},{}],"jilI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _browser = require("./browser");

var _default = {
  set(key, value) {
    _browser.$browser.storage.local.set({
      [key]: value
    });
  },

  async get(key) {
    /*
        const values = await (chrome
            ? new Promise(resolve => $browser.storage.local.get(key, resolve))
            : await $browser.storage.local.get(key));
    */
    const values = await new Promise(resolve => _browser.$browser.storage.local.get(key, resolve));
    return values[key];
  }

};
exports.default = _default;
},{"./browser":"etsM"}],"SiQT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSettings = showSettings;
exports.hideSettings = hideSettings;
exports.showFeedback = showFeedback;
exports.hideFeedback = hideFeedback;

function showSettings() {
  document.getElementById('settings').classList.add('show');
}

function hideSettings() {
  document.getElementById('settings').classList.remove('show');
}

function showFeedback() {
  document.getElementById('feedback').classList.add('show');
}

function hideFeedback() {
  document.getElementById('feedback').classList.remove('show');
}
},{}],"jCEq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupHome = setupHome;

var _storage = _interopRequireDefault(require("../../utils/storage"));

var _nav = require("./nav");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function setupHome() {
  const $home = document.getElementById('home');
  $home.querySelector('.on-off').addEventListener("click", toggleOnOffState);
  $home.querySelector('.settings').addEventListener("click", _nav.showSettings);
  $home.querySelector('.feedback').addEventListener("click", _nav.showFeedback);
  document.body.classList.add('init');
  const isOn = await getOnOff();
  await updateOnOffState(isOn);
  setTimeout(() => {
    document.body.classList.remove('init');
  });

  async function toggleOnOffState() {
    const isOn = !(await getOnOff());
    setOnOff(isOn);
    await updateOnOffState(isOn);
  }

  async function updateOnOffState(isOn) {
    $home.classList.toggle('on', isOn);
  }

  function setOnOff(isOn) {
    _storage.default.set('isOn', isOn);
  }

  async function getOnOff() {
    var _await$storage$get;

    return (_await$storage$get = await _storage.default.get('isOn')) !== null && _await$storage$get !== void 0 ? _await$storage$get : false;
  }
}
},{"../../utils/storage":"jilI","./nav":"SiQT"}],"GlPz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSettings = setupSettings;

var _storage = _interopRequireDefault(require("../../utils/storage"));

var _nav = require("./nav");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function setupSettings() {
  const $settings = document.getElementById('settings');
  $settings.querySelector('.back').addEventListener('click', _nav.hideSettings);
  const $submarine = $settings.querySelector('.submarine');
  const $selector = $settings.querySelector('.selector');
  $selector.addEventListener('click', selectLevel);
  let currentLevel = await getLevel();
  updateLevel(currentLevel);

  function selectLevel(e) {
    let level = e.target.className;

    if (level.startsWith('level')) {
      level = level.substr(6);

      if (level !== currentLevel) {
        setLevel(level);
        updateLevel(level);
      }
    }
  }

  function updateLevel(level) {
    $submarine.classList.remove(`level-${currentLevel}`);
    $submarine.classList.add(`level-${level}`);
    currentLevel = level;
    $selector.querySelectorAll(`.active`).forEach($ => $.classList.remove('active'));
    const $level = $selector.querySelector(`.level-${level}`);
    $level.classList.add('active');
    const rect = $level.getBoundingClientRect();
    console.log($level, rect);
    const y = (rect.top + rect.bottom) / 2;
    $submarine.style.top = `${y}px`;
  }

  async function getLevel() {
    var _await$storage$get;

    return (_await$storage$get = await _storage.default.get('level')) !== null && _await$storage$get !== void 0 ? _await$storage$get : '1';
  }

  async function setLevel(level) {
    _storage.default.set('level', level);
  }
}
},{"../../utils/storage":"jilI","./nav":"SiQT"}],"Mo1R":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupFeedback = setupFeedback;

var _nav = require("./nav");

async function setupFeedback() {
  const $feedback = document.getElementById('feedback');
  $feedback.querySelector('.back').addEventListener('click', _nav.hideFeedback);
  $feedback.querySelector('form').addEventListener('submit', submitForm);

  function submitForm() {}
}
},{"./nav":"SiQT"}],"rxbR":[function(require,module,exports) {

},{"./..\\svg\\arrow-left-2.svg":[["arrow-left-2.1166ee40.svg","VBEE"],"VBEE"],"./..\\svg\\submarine.svg":[["submarine.c542c169.svg","YQoQ"],"YQoQ"],"./..\\svg\\bg.svg":[["bg.83d56eb9.svg","JNwk"],"JNwk"],"./..\\svg\\settings.svg":[["settings.a3599c4e.svg","spi0"],"spi0"],"./..\\svg\\headphones.svg":[["headphones.483b2d55.svg","dB0e"],"dB0e"],"./..\\svg\\on.svg":[["on.a7b5173f.svg","KHMv"],"KHMv"]}],"Hptd":[function(require,module,exports) {
"use strict";

var _home = require("./home");

var _settings = require("./settings");

var _feedback = require("./feedback");

require("../css/index.scss");

// import "core-js/stable";
// import "regenerator-runtime/runtime";
window.addEventListener('load', () => {
  // document.addEventListener('readystatechange', () => {
  //   if( document.readyState !== 'interactive' )
  //     return;
  (0, _home.setupHome)();
  (0, _settings.setupSettings)();
  (0, _feedback.setupFeedback)(); // });
}, {
  once: true
});
},{"./home":"jCEq","./settings":"GlPz","./feedback":"Mo1R","../css/index.scss":"rxbR"}]},{},["Hptd"], null)
//# sourceMappingURL=/popup.68fdc3b7.js.map