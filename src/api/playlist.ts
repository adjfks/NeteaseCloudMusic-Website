import request from "@/utils/request"

/**
  *
  *@param {string | number} id 歌单id
  *@returns
  */
export const getPlaylistById = (id: string | number) => {
  return request('playlist/detail', 'get', { id })
}
