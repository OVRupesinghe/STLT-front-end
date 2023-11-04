import axios from 'axios';
const BASE_URL = 'http://localhost:9999';
// const BASE_URL = 'http://13.233.104.173:8000';
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL:    BASE_URL,
    withCredentials: true
});
