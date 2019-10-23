import { message } from 'antd'
import Axios from 'axios'

message.config({
  maxCount: 1
})

/* 创建 axios 实例 */
let apiService = Axios.create({
  baseURL: 'http://119.3.43.136:3000/api',
  timeout: 10000
})

/* 请求拦截器 */
apiService.interceptors.request.use(
  config => {
    message.loading('loading...', 10)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/* 响应拦截器 */
apiService.interceptors.response.use(
  response => {
    message.destroy()
    return response
  },
  error => {
    if (error.message.includes('timeout')) {
      message.error('REQUEST_TIMEOUT')
    }
    if (!error.response) {
      message.error('DISCONNECTED')
    }
    return Promise.reject(error)
  }
)

export { apiService }
