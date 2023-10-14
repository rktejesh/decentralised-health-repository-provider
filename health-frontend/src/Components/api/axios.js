import axios from 'axios';
const BASE_URL = 'http://34.116.184.81:4000/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});