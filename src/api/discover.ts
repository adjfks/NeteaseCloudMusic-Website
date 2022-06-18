import request from '@/utils/request'

/**
 * 获取轮播图
 * @param type 资源类型 0: pc 1: android 2: iphone 3: ipad
 * @returns 
 */
export const getBanner = (type?: number) => {
  return request('banner', 'get', { type })
}

/**
 * 获取歌单
 * @param limit 数量
 * @returns 
 */
export const getPlaylist = (limit?: number) => {
  return request('personalized', 'get', { limit })
}

/**
 * 获取推荐新歌曲
 * @param limit 数量
 * @returns 
 */
export const getNewSong = (limit?: number) => {
  return request('personalized/newsong', 'get', { limit })
}
