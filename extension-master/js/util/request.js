/**
 * Модуль запросов
 */
export const Request = {

    post: async (url = "", headers = {}, data = {}) => {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    get: async (url = "", params = {}) => {
        let uri = new URL(url);
        uri.search = new URLSearchParams(params).toString();
        return  await fetch(url);
    }
}
