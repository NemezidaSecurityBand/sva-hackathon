var isOn = parseInt(localStorage.getItem('periscope_isOn')) || 0
if (true) {
    var lat = 52.200;
    var lon = 42.900;
    var acc = 400;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].text.indexOf("coords") !== -1) {
            scripts[i].text = scripts[i].text.replace(/position\.coords\.latitude/g, lat);
            scripts[i].text = scripts[i].text.replace(/position\.coords\.longitude/g, lon);
            scripts[i].text = scripts[i].text.replace(/position\.coords\.accuracy/g, acc);
            scripts[i].text = scripts[i].text.replace(/coords\.latitude/g, lat);
            scripts[i].text = scripts[i].text.replace(/coords\.longitude/g, lon);
            scripts[i].text = scripts[i].text.replace(/coords\.accuracy/g, acc);
        }
    }

    var script = document.createElement('script');
    script.innerHTML = 'navigator.geolocation.getCurrentPosition=function(a,b,c){a({coords:{latitude:' + lat + ',longitude:' + lon + ',accuracy:' + acc + '},timestamp:Date.now()})};var position={coords:{latitude:' + lat + ',longitude:' + lon + ',accuracy:' + acc + '}};';
    (document.head || document.documentElement).appendChild(script);
}