import { request } from './request'

// 获取已审核房屋
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

// 首页搜索地址
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

// 通过id获取房屋信息
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

// 获取用户信息
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

// 发布房屋信息
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

// 获取用户个人房屋
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

// 删除房屋
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

// 更新房屋信息
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

