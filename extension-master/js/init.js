(function (origin) {
    'use strict';
    var seed = (function (origin) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = "top";
        ctx.font = "16px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#068";
        ctx.fillText(origin, 3, 18);
        ctx.fillStyle = "#f61";
        ctx.fillRect(125, 1, 62, 30);
        ctx.fillStyle = "rgba(101,202,0,0.75)";
        ctx.fillText(origin, 5, 17);
        return (canvas.toDataURL());
    })(origin) + (new Date().toDateString());

    var inject = function (filePath, seed) {
        var script = document.createElement('script');
        script.setAttribute("data-seed", seed ? seed : '');
        script.src = chrome.extension.getURL(filePath);
        script.onload = function () {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(script);
    }
    var isOn = parseInt(localStorage.getItem('periscope_isOn')) || 0
    console.log("111");
    console.log(isOn);

    inject("js/lib/seedrandom.js");
    inject("js/random.js", seed);
    inject("js/api/canvas.js");
    inject("js/api/gps.js");
    inject("js/api/params.js");

})(window.location.hostname);