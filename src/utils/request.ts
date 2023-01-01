import axios from 'axios'
import { Method } from '@/type'

const baseURL = __DEV__
  ? 'http://http://43.139.206.205:4001/'
  : 'http://http://43.139.206.205:4001/'

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

// 请求拦截器 有权限的接口 /my 携带上cookie
// instance.interceptors.request.use(
//   (config) => {
//     if (config.url?.startsWith('my')) {
//       console.log('需要权限的接口')

//       config.withCredentials = true
//     }
//     console.log(config)

//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )

// 请求工具函数
export default (url: string, method: Method, submitData?: any): any => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  })
}
