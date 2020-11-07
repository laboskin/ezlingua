export const request = async (url, method = 'GET', body = null, headers = {}, token = null) => {
    try {
        if (body) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {method, body, headers});
        if (response.status === 401) {
            throw new Error(`${response.status} Unauthorized`);
        }
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`${response.status} ${data.message || 'Request error'}`);
        }
        return data;
    } catch (e) {
        throw e;
    }
}