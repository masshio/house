import { request } from './request'

export function getHouses(parameter) {
    return request({
        url: '/house/getHouses',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function searchAdd(parameter) {
    return request({
        url: '/house/searchAdd',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function getHousesById(parameter) {
    return request({
        url: '/house/getHousesById',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function getMessageById(parameter) {
    return request({
        url: '/user/getMessageById',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function uploadImg(parameter) {
    return request({
        url: '/house/uploadImg',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'multipart/form-data',
        }
    })
}
export function addHouses(parameter) {
    return request({
        url: '/house/addHouses',
        method: 'post',
        data: parameter,
        headers: {
            // 'content-type': 'multipart/form-data',
            'content-type': 'application/json',
        }
    })
}

export function getOwnHouses(parameter) {
    return request({
        url: '/house/getOwnHouses',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function deleteHouses(parameter) {
    return request({
        url: '/house/deleteHouses',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function updateHouses(parameter) {
    return request({
        url: '/house/updateHouses',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function housePrice(parameter) {
    return request({
        url: '/house/housePrice',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}