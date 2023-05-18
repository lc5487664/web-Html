import axios from 'axios'
import qs from 'qs'

// 创建 axios 实例
const request = axios.create({
  baseURL: '',
  widthCredentials: true, // 请求头自动携带cookie
  timeout: 60000000 // 请求超时时间
})

request.interceptors.request.use(
  config => {
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
    }
    return config
  }
)

request.interceptors.response.use(
  config => {
    return config
  }
)

export default request
