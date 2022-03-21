import { request } from './request'

export function getNotice(parameter) {
    return request({
        url: '/notice/getNotice',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function addNotice(parameter) {
    return request({
        url: '/notice/addNotice',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function deleteNotice(parameter) {
    return request({
        url: '/notice/deleteNotice',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function updateNotice(parameter) {
    return request({
        url: '/notice/updateNotice',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}