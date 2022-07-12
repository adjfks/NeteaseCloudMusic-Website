import request from '@/utils/request'

const requestWithCookie = () => {}
/**
 *
 *@param {Number} uid 用户id
 *@param {String} cookie
 *@returns
 */
export const getLikeIds = (uid: number, cookie: string) => {
  return request('likelist', 'get', { uid, cookie })
}
