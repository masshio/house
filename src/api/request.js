import axios from "axios";
import store from '@/store'
export function request(config) {
    const resolve = axios.create({
        baseURL: 'http://127.0.0.1:3000',
        timeout: 5000
    })

    resolve.interceptors.request.use(config => {
        const token = store.state.token;
        if(token) {
            config.headers['token'] = token
        }
        return config;
    },err => {
        return Promise.reject(err);
    })

    resolve.interceptors.response.use(res => {
        return res.data;
    }, err => {
        return Promise.reject(err)
    })

    return resolve(config);
}