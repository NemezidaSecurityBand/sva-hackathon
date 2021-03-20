if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
} else {
    scan();
}
const apiKey = "fdc51984c8957e2af90d0a191db5067a5592f0becf042cab8c5e62925068721d";

function scan() {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        let uri = new URL(tabs[0].url);
        return getReportForUrl(uri.origin)
            .then(r => {
                console.log("RRRRR", r)
                if(r.scans !== undefined) {
                    let result = Object.values(r.scans);

                    console.log("array", result)

                    let scans = result.map(item => item.detected).filter(item => item);

                    console.log("array*", scans);

                    if (scans.length > 0) {
                        Notification.requestPermission()
                            .then((permission) => {
                            if (permission === "granted") {
                                let notification = new Notification("Сайт является небезопасным.");
                            }
                        });
                    } else {
                        Notification.requestPermission()
                            .then((permission) => {
                            if (permission === "granted") {
                                let notification = new Notification("Сайт признан безопасным для посещения.");
                            }
                        });
                    }
                } else {
                    Notification.requestPermission()
                        .then((permission) => {
                        if (permission === "granted") {
                            let notification = new Notification("Нам не удалось проверить сайт");
                        }
                    });
                }
                return r;
            });
    });
}

/**
 *
 * @param resource - урла для сканирования
 * @returns {Promise<void>}
 */
async function getReportForUrl(resource) {
    let url = new URL("https://www.virustotal.com/vtapi/v2/url/report");
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





