import { request } from './request'

export function getHouses(parameter) {
    return request({
        url: '/getHouses',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function searchAdd(parameter) {
    return request({
        url: '/searchAdd',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function getHousesById(parameter) {
    return request({
        url: '/getHousesById',
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

export function addHouses(parameter) {
    return request({
        url: '/addHouses',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function getOwnHouses(parameter) {
    return request({
        url: '/getOwnHouses',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function deleteHouses(parameter) {
    return request({
        url: '/deleteHouses',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}

export function updateHouses(parameter) {
    return request({
        url: '/updateHouses',
        method: 'post',
        data: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}
export function housePrice(parameter) {
    return request({
        url: '/housePrice',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json',
        }
    })
}