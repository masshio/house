import { request } from './request'

export function UserLogin(parameter) {
    return request({
        url: '/user/login',
        method: 'post',
        data: parameter,
        headers: {
            // 'content-type': 'application/x-www-form-urlencoded',
            'content-type': 'application/json',
        }
    })
}

export function AdminLogin(parameter) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: parameter,
        headers: {
            // 'content-type': 'application/x-www-form-urlencoded',
            'content-type': 'application/json',
        }
    })
}