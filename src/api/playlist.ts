import request from "@/utils/request"

/**
  *
  *@param {string | number} id 歌单id
  *@returns
  */
export const getPlaylistById = (id: string | number) => {
  return request('playlist/detail', 'get', { id })
}

/**
  *获取歌曲详情
  *@param {String | Number} ids ids=347230,347231
  *@returns {Object}
  */
export const getSongsByIds = (ids: string | number) => {
  return request('song/detail', 'get', { ids })
}

/**
  *
  *@param {String | Number} id 歌单id
  *@param { Number } limit 可选 取出评论数量 默认20
  *@param { Number } offset 可选 偏移数量 , 用于分页 
  *@param { Number } before 可选 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
  *@returns
  */

export const getCommentOfPlaylistById = (params: {
  id: string | number,
  limit?: number,
  offset?: number,
  before?: any
}) => {
  params.limit = params.limit ? params.limit : 20
  return request('comment/playlist', 'get', { id: params.id, limit: params.limit, offset: params.offset, before: params.before })
}
