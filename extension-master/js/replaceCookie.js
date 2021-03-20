let allCookies = String(document.cookie);
let arrCookies = allCookies.split(";")

console.log("Cookie clean up")
console.log(document.cookie);

let mainCookie = arrCookies
    .map(item => item.split("="))
    .map(item => item[0])
    .filter(item => item.includes("ID")
        || item.includes("id")
        || item.includes("uid"))
    .map(item => document.cookie = item + "=" + "Nemezida");

console.log(document.cookie);
