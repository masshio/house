import { request } from "./request";
export function Register(params) {
    return request({
        url: '/user/register',
        method: 'post',
        data: params,
        headers: {
            'content-type': 'application/json'
        }
    })
}