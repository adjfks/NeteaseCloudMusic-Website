import request from '@/utils/request'
import { Id } from '@/type'
/**
 *获取音乐URL
 *@param {String | Number} id 音乐id
 *@param {Number} br 音乐码率 默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推 ，可选
 *@returns
 */
export const getMusicUrl = (id: Id, br: number = 999000) => {
  return request('song/url', 'get', { id, br })
}

/**
 *获取歌词
 *@param {Id} 歌曲id
 *@returns
 */
export const getLyric = (id: Id) => {
  return request('lyric', 'get', { id })
}
