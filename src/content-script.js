import {sendMessage} from "./utils/browser";

// dontRun();

scanViruses();

async function scanViruses() {
  const url = window.location.origin;
  console.log('SCAN', url);
  if( url.startsWith('https://httpbin.org') ) {
    const r = await sendMessage({
      contentScriptQuery: 'virusReport',
      url: url
    });
    console.log('SCAN', r);
  }
}


function dontRun() {

  const host = document.createElement('div');
  document.body.insertAdjacentElement('beforebegin', host);
  const $root = host.attachShadow({mode: "open"});

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

