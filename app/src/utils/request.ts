import axios, { AxiosInstance } from 'axios';

const request = axios.create({});

request.interceptors.request.use((config) => config);
request.interceptors.response.use((config) => config);

export default request;
