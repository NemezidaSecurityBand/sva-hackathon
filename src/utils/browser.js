
const _browser = () => {
  try {
    return browser || chrome;
  } catch( e ) {
    return window['browser'] || window['chrome'];
  }
};

const _isChrome = () => {
  return !!browser && !!chrome;
};

export const $browser = chrome;
// export const $browser = _browser();


export const isChromeBrowser = true;
console.log('isChrome', isChromeBrowser);

export async function sendMessage(message) {
  if( isChromeBrowser ) {
    return new Promise(resolve => {
      $browser.runtime.sendMessage(message, resolve);
    });
  } else {
    return $browser.runtime.sendMessage(message);
  }
}

export function onMessage(handler) {
  $browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const result = handler(request, sender);
    if( result instanceof Promise ) {
      result.then(sendResponse);
      return true;  // Will respond asynchronously
    }
    sendResponse(result);
  });
}

