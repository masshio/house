import { request } from './request'

export function getUser(parameter) {
    return request({
        url: '/user/getUser',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function deleteUser(parameter) {
    return request({
        url: '/user/deleteUser',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function updateUser(parameter) {
    return request({
        url: '/user/updateUser',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
