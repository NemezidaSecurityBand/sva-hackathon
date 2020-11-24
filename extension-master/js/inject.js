(function(origin){
  'use strict';

  console.log("Content Script Running ...");

  var seed=(function(origin){
    var canvas=document.createElement('canvas');
    var ctx=canvas.getContext('2d');
    ctx.textBaseline="top";
    ctx.font="16px 'Arial'";
    ctx.textBaseline="alphabetic";
    ctx.fillStyle="#068";
    ctx.fillText(origin,3,18);
    ctx.fillStyle="#f61";
    ctx.fillRect(125,1,62,30);
    ctx.fillStyle="rgba(101,202,0,0.75)";
    ctx.fillText(origin,5,17);
    return(canvas.toDataURL());
  })(origin)+(new Date().toDateString());

  var inject=function(filePath,seed){
    // Dynamically create a script
    var script=document.createElement('script');

    // Give the script a seed value to use for spoofing
    script.setAttribute("data-seed",seed?seed:'');

    // Give the script a url to the javascript code to run
    script.src=chrome.extension.getURL(filePath);

    // Listen for the script loading event
    script.onload = function(){
      // Remove the script from the page so the page scripts don't see it
      this.remove();
    };

    // Add the script tag to the DOM
    (document.head||document.documentElement).appendChild(script);
  }

  // TODO: Still fails to inject into a sandboxed iframe
  // TODO: on chromium/chrome.

  // TODO: Still can see real values for navigator (and probably other objects)
  // TODO: when using the iframe.contentWindow method.
  inject("js/lib/seedrandom.js");
  console.log("[INFO] Injected Seed Random ...");

  inject("js/random.js",seed);
  console.log("[INFO] Injected Random ...");

  // inject("js/api/document.js",seed);
  // console.log("[INFO] Injected Document API ...");

  // inject("js/api/navigatorScreenLanguageDatetime.js",seed);
  // console.log("[INFO] Injected Navigator&Screen&Language&Datetime API ...");

  // inject("js/api/rects.js",seed);
  // console.log("[INFO] Injected Client Rect API ...");

  inject("js/api/webgl.js");
  console.log("[INFO] Injected WebGL API ...");

  // inject("js/api/history.js",seed);
  // console.log("[INFO] Injected History API ...");

  // inject("js/api/battery.js",seed);
  // console.log("[INFO] Injected Battery API ...");

  // inject("js/api/injectAudio.js",seed);
  // console.log("[INFO] Injected Audio API ...");

  // TODO: Messing with client rectangles prevents logging into
  // TODO: https://twitter.com/.
  // TODO: Either ditch entirely or fix properly.
  //inject("js/api/element.js", seed);
  //console.log("[INFO] Injected Element API ...");

})(window.location.hostname);