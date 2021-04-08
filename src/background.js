import 'crx-hotreload';
import {$browser, onMessage} from "./utils/browser";
import {getReportForUrl, virusTotalScan} from "./popup/js/integration/virusTotalIntegration";

const USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25";
const ACCEPT_LANGUAGE = "en-US";
const DNT = "1";
const SPECIAL_CHARS = '^$&+?.()|{}[]/'.split('');

let isOn = false;

let dntProfile = {
  headers: {
    // 'user-agent': USER_AGENT,
    // 'accept-language': ACCEPT_LANGUAGE,
    // 'dnt': DNT
  }
};


function setupHeaderModListener() {
  // $browser.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeadersListener);

  $browser.webRequest.onBeforeSendHeaders.addListener(
      onBeforeSendHeadersListener,
      {urls: ['<all_urls>']},
      ['requestHeaders', 'blocking']
  );
}

async function onBeforeSendHeadersListener(request) {
  if( request.url.startsWith('https://httpbin.org') ) {
    // const r = await getReportForUrl(new URL(request.url).origin);
    // console.log(r);
  }

  // return {requestHeaders: modifyHeader(dntProfile.headers, request.requestHeaders)};
  return {requestHeaders: [...modifyHeader(dntProfile.headers, request.requestHeaders), {name: 'TEST', value: 'TEST'}]};
}

function modifyHeader(dntHeaders, reqHeaders) {
  return reqHeaders.map(header => {
    // console.log(header.name, header.value);
    const dntValue = dntHeaders[header.name.toLowerCase()];
    return {name: header.name, value: dntValue ?? header.value};
  });
}


setupHeaderModListener();


onMessage(async (message) => {
  if( message.contentScriptQuery === 'virusReport' ) {
    return await getReportForUrl(new URL(message.url).origin);
  }
});
