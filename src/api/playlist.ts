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
