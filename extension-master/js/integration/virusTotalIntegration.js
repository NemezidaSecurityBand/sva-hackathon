const apiKey = "fdc51984c8957e2af90d0a191db5067a5592f0becf042cab8c5e62925068721d";

/**
 *
 * @param url - куда шлем
 * @param data - что шлем
 * @param contentType - в каком формате
 * @returns {Promise<any>} - ответ от сервиса в виде промиса
 */
async function postRequest(url, data, contentType) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': contentType
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

/**
 * Метод скана сайта в virus total
 * @param resource - урла которую сканим
 * P.S метод еще на доработке
 * Вернет инфу о сканировании, нам нужен ток scan_id
 */
function scanUrl(resource) {
    let data = {
        apikey: apiKey,
        url: resource
    };
    postRequest(Urls.scan, data, "x-www-form-urlencoded").catch()
        .then((data) => {
            return data
        });
}


/**
 *
 * @param resource - урла для сканирования
 * @returns {Promise<void>}
 */
async function getReportForUrl(resource) {
    let url = new URL(Urls.report);
    let params = {
        apikey: apiKey,
        resource: resource,
        allinfo: true
    }
    url.search = new URLSearchParams(params).toString();
    let response = await fetch(url);
    if (response.ok) {
        let infoAboutUrl = await response.json();
        console.log(infoAboutUrl);

        // let fails = infoAboutUrl.scans.filter(scan => scan.)
        return infoAboutUrl;
    } else console.log("Алярма virus total не отработал")
}






