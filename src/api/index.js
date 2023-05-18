import request from './request.js'
import localApi from './localApiMap.js'

const USE_LOCAL_JSON = process.env.NODE_ENV == 'development' ? true : false
/* eslint-disable no-undef */
// const pathMap =  USE_LOCAL_JSON ? localApi : $onlineApi
const pathMap =  localApi 
export const http_get = (url, params) => {
    if (!pathMap[url]) {
        console.error('暂未配置url映射地址')
        return
    }
    return request({
        url: pathMap[url],
        method: 'GET',
        params
    })
}

export const http_post = (url, data, option) => {
    if (!pathMap[url]) {
        console.error('暂未配置url映射地址')
        return
    }
    return request({
        url: pathMap[url],
        method: 'POST',
        data,
        ...option
    })
}