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
})({"AJzn":[function(require,module,exports) {
const filesInDirectory = dir => new Promise (resolve =>
    dir.createReader ().readEntries (entries =>
        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>
            e.isDirectory
                ? filesInDirectory (e)
                : new Promise (resolve => e.file (resolve))
        ))
        .then (files => [].concat (...files))
        .then (resolve)
    )
)

const timestampForFilesInDirectory = dir =>
        filesInDirectory (dir).then (files =>
            files.map (f => f.name + f.lastModifiedDate).join ())

const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory (dir).then (timestamp => {
        if (!lastTimestamp || (lastTimestamp === timestamp)) {
            setTimeout (() => watchChanges (dir, timestamp), 1000) // retry after 1s
        } else {
            chrome.runtime.reload ()
        }
    })
}

chrome.management.getSelf (self => {
    if (self.installType === 'development') {
        chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir))
        chrome.tabs.query ({ active: true, lastFocusedWindow: true }, tabs => { // NB: see https://github.com/xpl/crx-hotreload/issues/5
            if (tabs[0]) {
                chrome.tabs.reload (tabs[0].id)
            }
        })
    }
})

},{}],"etsM":[function(require,module,exports) {
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
},{}],"yaBP":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.virusTotalScan = virusTotalScan;
exports.getReportForUrl = getReportForUrl;
const API_KEY = "fdc51984c8957e2af90d0a191db5067a5592f0becf042cab8c5e62925068721d";
const REPORT_ULR = "https://www.virustotal.com/vtapi/v2/url/report";

async function virusTotalScan() {
  const r = await getReportForUrl(window.location.origin);
  console.log("RRRRR", r);
  if (true) return;

  if (r.scans !== undefined) {
    let result = Object.values(r.scans);
    console.log("array", result);
    let scans = result.map(item => item.detected).filter(item => item);
    console.log("array*", scans);

    if (scans.length > 0) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          let notification = new Notification("Сайт является небезопасным.");
        }
      });
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          let notification = new Notification("Сайт признан безопасным для посещения.");
        }
      });
    }
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        let notification = new Notification("Нам не удалось проверить сайт");
      }
    });
  }

  return r;
}

async function getReportForUrl(url) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    resource: url,
    scan: 1
  }).toString();
  console.log(`${REPORT_ULR}?${params}`); // let response = await fetch(`${REPORT_ULR}?${params}`);

  let response = await fetch(`${REPORT_ULR}?apikey=${API_KEY}&resource=${url}&scan=1`);
  return response.ok && (await response.json());
}
},{}],"bEr1":[function(require,module,exports) {
"use strict";

require("crx-hotreload");

var _browser = require("./utils/browser");

var _virusTotalIntegration = require("./popup/js/integration/virusTotalIntegration");

const USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25";
const ACCEPT_LANGUAGE = "en-US";
const DNT = "1";
const SPECIAL_CHARS = '^$&+?.()|{}[]/'.split('');
let isOn = false;
let dntProfile = {
  headers: {// 'user-agent': USER_AGENT,
    // 'accept-language': ACCEPT_LANGUAGE,
    // 'dnt': DNT
  }
};

function setupHeaderModListener() {
  // $browser.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeadersListener);
  _browser.$browser.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeadersListener, {
    urls: ['<all_urls>']
  }, ['requestHeaders', 'blocking']);
}

async function onBeforeSendHeadersListener(request) {
  if (request.url.startsWith('https://httpbin.org')) {// const r = await getReportForUrl(new URL(request.url).origin);
    // console.log(r);
  } // return {requestHeaders: modifyHeader(dntProfile.headers, request.requestHeaders)};


  return {
    requestHeaders: [...modifyHeader(dntProfile.headers, request.requestHeaders), {
      name: 'TEST',
      value: 'TEST'
    }]
  };
}

function modifyHeader(dntHeaders, reqHeaders) {
  return reqHeaders.map(header => {
    // console.log(header.name, header.value);
    const dntValue = dntHeaders[header.name.toLowerCase()];
    return {
      name: header.name,
      value: dntValue !== null && dntValue !== void 0 ? dntValue : header.value
    };
  });
}

setupHeaderModListener();
(0, _browser.onMessage)(async message => {
  if (message.contentScriptQuery === 'virusReport') {
    return await (0, _virusTotalIntegration.getReportForUrl)(new URL(message.url).origin);
  }
});
},{"crx-hotreload":"AJzn","./utils/browser":"etsM","./popup/js/integration/virusTotalIntegration":"yaBP"}]},{},["bEr1"], null)
//# sourceMappingURL=/background.js.map