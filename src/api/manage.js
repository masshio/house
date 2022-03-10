import { request } from './request'

// 待审核房屋
export function examineHouse(parameter) {
    return request({
        url: '/house/examineHouse',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json'
        }
    })
}

// 房屋价格分析
export function housePrice(parameter) {
    return request({
        url: '/house/housePrice',
        method: 'get',
        params: parameter,
        headers: {
            'content-type': 'application/json'
        }
    })
}

// 用户年龄层
export function userAge(parameter) {
    return request({
        url: '/user/userAge',
        method: 'get',
        data: parameter,
        headers: {
            'content-type': 'application/json'
        }
    })
}