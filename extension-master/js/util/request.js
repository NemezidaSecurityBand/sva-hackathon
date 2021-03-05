/**
 * Модуль запросов
 */
const request = {

    method: {
        POST: "POST",
        GET: "GET",
        PUT: "PUT",
        PATH: "PATH",
        DELETE: "DELETE"
    },

    post: async (url = "", headers = {}, data = {}) => {
        const response = await fetch(url, {
            method: this.method.POST,
            headers: headers,
            body: JSON.stringify(data)
        });
        return await response.json();
    },
    get: async (url, params = {}) => {
        let uri = new URL(url);
        url.search = new URLSearchParams(params).toString();
        return  await fetch(url);
    }
}
