import request from "@/utils/request";

/**
  *游客登录获取cookie
  *@returns
  */
export const getCookie = () => {
  return request('register/anonimous', 'get')
}
