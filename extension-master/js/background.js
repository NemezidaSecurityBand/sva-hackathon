//global const
const userugent = "Some UserAgent";
const acceptLanguage = "jo-PA";


//module const
const browser = chrome;
const SPECIAL_CHARS = '^$&+?.()|{}[]/'.split('');
const EXTRA_REQUEST_HEADERS = new Set(['accept-language', 'accept-encoding', 'referer', 'cookie']);


//Modify HEADERS
function loadSelectedProfile_() {
  let headers = [];
   	headers = [{name: 'User-Agent', value: userugent}, {name: 'Accept-Language', value: acceptLanguage}];
    console.log(headers);
  return {
      headers: headers
  };
};

function modifyHeader(source, dest) {
  if (!source.length) {
    return;
  }
  // Create an index map so that we can more efficiently override
  // existing header.
  const indexMap = {};
  for (const index in dest) {
    const header = dest[index];
    indexMap[header.name.toLowerCase()] = index;
  }
  for (let header of source) {
    const index = indexMap[header.name.toLowerCase()];
    if (index !== undefined) {
        dest[index].value = header.value;
    } else {
      dest.push({name: header.name, value: header.value});
      indexMap[header.name.toLowerCase()] = dest.length - 1;
    }
  }
};

function modifyRequestHeaderHandler_(details) {
    if (currentProfile) {
      modifyHeader(currentProfile.headers, details.requestHeaders);
    }
  return {requestHeaders: details.requestHeaders};
};



function setupHeaderModListener() {
  browser.webRequest.onBeforeSendHeaders.removeListener(modifyRequestHeaderHandler_);
  // Chrome 72+ requires 'extraHeaders' to be added for some headers to be modifiable.
  // Older versions break with it.
  if (currentProfile.headers.length > 0) {
    let requiresExtraRequestHeaders = false;
      for (let header of currentProfile.headers) {
        if (EXTRA_REQUEST_HEADERS.has(header.name.toLowerCase())) {
          requiresExtraRequestHeaders = true;
          break;
        }
      }

    browser.webRequest.onBeforeSendHeaders.addListener(
      modifyRequestHeaderHandler_,
      {urls: ["<all_urls>"]},
      requiresExtraRequestHeaders ? ['requestHeaders', 'blocking', 'extraHeaders'] : ['requestHeaders', 'blocking']
    );
  }
}

function initializeStorage() {
  currentProfile = loadSelectedProfile_();
  setupHeaderModListener();

  window.addEventListener('storage', function(e) {
    currentProfile = loadSelectedProfile_();
    setupHeaderModListener();
  });
}

initializeStorage();




