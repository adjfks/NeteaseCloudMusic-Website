import axios from 'axios'
import { Method } from '@/type'

const baseURL = __DEV__
  ? 'http://localhost:4000/'
  : 'http://120.25.153.83:4000/'
const instance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
})

// 响应拦截器
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    return Promise.reject(err)
  }
)

// 请求工具函数
export default (url: string, method: Method, submitData?: any): any => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  })
}
