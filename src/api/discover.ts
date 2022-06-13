import request from '@/utils/request'

export const getBanner = (type?: number) => {
  return request('banner', 'get', type)
}
