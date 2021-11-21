import { request } from './request'

export function getMessage(parameter) {
    return request({
        url: '/user/getMessage',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function updateMessage(parameter) {
    return request({
        url: '/user/updateMessage',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function changePass(parameter) {
    return request({
        url: '/user/changePass',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}