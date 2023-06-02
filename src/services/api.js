import axios from 'axios';

const url_base = "http://127.0.0.1:3000/api";

const api = axios.create(
    {
        baseURL: url_base,
        headers: {
            Accept: 'application/json',
            // Authorization: 'Bearer '
        }
    }
);

const apiService = {
    get: (url, params) => api.get(url, params),
    post: (url, params) => api.post(url, params),
    put: (url, params) => api.put(url, params),
    delete: (url, params) => api.delete(url, params)
}

export default apiService;