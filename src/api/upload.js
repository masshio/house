import { request } from './request'

// 上传图片
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