import axios from "axios";
import store from '@/store'
import router from '@/router'
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
        if(res.data.code == 401) {
            store.commit('LOGOUT')
            router.push('/')
        }
        return res.data;
    }, err => {
        console.log(err);
        return Promise.reject(err)
    })

    return resolve(config);
}