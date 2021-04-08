const API_KEY = "fdc51984c8957e2af90d0a191db5067a5592f0becf042cab8c5e62925068721d";
const REPORT_ULR = "https://www.virustotal.com/vtapi/v2/url/report";

export async function virusTotalScan() {
    const r = await getReportForUrl(window.location.origin);
    console.log("RRRRR", r)

    if (true) return;

    if (r.scans !== undefined) {
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
}

export async function getReportForUrl(url) {
    const params = new URLSearchParams({
        apikey: API_KEY,
        resource: url,
        scan: 1
    }).toString();

    console.log(`${REPORT_ULR}?${params}`);
    // let response = await fetch(`${REPORT_ULR}?${params}`);
    let response = await fetch(`${REPORT_ULR}?apikey=${API_KEY}&resource=${url}&scan=1`);
    return response.ok && await response.json();
}





