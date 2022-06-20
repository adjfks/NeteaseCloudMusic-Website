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
 * 获取推荐歌单
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

/**
 * 获取推荐MV
 * @returns 
 */
export const getMv = () => {
  return request('personalized/mv', 'get')
}

/**
 * 获取独家放送
 * @returns 
 */
export const getPrivateContent = () => {
  return request('personalized/privatecontent', 'get')
}

/**
 * 获取歌单分类
 * @returns 歌单分类列表
 */
export const getPlaylistCatgory = () => { 
  return request('playlist/catlist', 'get')
}

/**
 * 获取精品歌单
 * @param limit 数量
 * @param cat tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取/playlist/highquality/tags
 * @param before 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @returns 
 */
export const getHighQualityPlaylist = (limit?: number, cat?: string, before?: number) => {
  return request('top/playlist/highquality', 'get', { limit, cat, before })
}

/**
 * 获取热门歌单分类
 * @returns 
 */
export const getHotCategory = () => { 
  return request('playlist/hot' , 'get')
}

/**
 * 获取全部歌单分类
 * @returns 
 */
export const getAllCategory = () => { 
  return request('playlist/catlist' , 'get')
}

/**
  *
  *@param order 'new' | 'hot'
  *@param cat 如'华语'、'古风',从getAllCategory获取
  *@param limit 默认50
  *@param offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
  *@returns
  */
export interface GetPlaylistParams {
  order?: 'new' | 'hot',
  cat?: string,
  limit?: number
  offset?: number
}
export const getPlaylistByCat = (params: GetPlaylistParams) => {
  return request('/top/playlist' , 'get' , params)
}

/**
  * 获取排行榜
  *@returns
  */
export const getToplist = () => {
  return request('toplist' , 'get')
}
