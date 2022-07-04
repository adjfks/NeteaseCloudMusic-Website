import axios from 'axios'
import { Method } from '@/type'
// import { useUser } from '@/store/user'

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

// 请求拦截器 有权限的接口 /my 携带上cookie
// instance.interceptors.request.use(
//   (config) => {
//     const user = useUser()
//     if (config.params) {
//       config.params.cookie = encodeURIComponent(user.cookie)
//     } else {
//       config.data = {}
//       config.data.cookie = user.cookie
//     }
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
