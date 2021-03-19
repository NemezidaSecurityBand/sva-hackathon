import {Urls} from '../util/urls.js'

const apiKey = "fdc51984c8957e2af90d0a191db5067a5592f0becf042cab8c5e62925068721d";

/**
 *
 * @param resource - урла для сканирования
 * @returns {Promise<void>}
 */
async function getReportForUrl(resource) {
    let url = new URL(Urls.report);
    let params = {
        apikey: apiKey,
        resource: resource
    }
    url.search = new URLSearchParams(params).toString();
    let response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else console.log("Алярма virus total не отработал")
}

let info = chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
    let uri = new URL(tabs[0].url);
    return getReportForUrl(uri.origin)
        .then(r => {
            console.log("RRRRR", r)

            Notification.requestPermission().then(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    let notification = new Notification("Hi there!");
                }
            });
            return r;
        });
});





