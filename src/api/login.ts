import request from "@/utils/request";

/**
  *游客登录获取cookie
  *@returns
  */
export const getCookie = () => {
  return request('register/anonimous', 'get')
}


/**
  *获取二维码key
  *@returns
  */

export const getQrKey = () => {
  return request('login/qr/key', 'get', {
    timeStamp: String(Date.now())
  })
}

/**
  *二维码生成接口
  *@param {String} key
  *@returns
  */
export const getQrCode = (key: string, qrimg?: boolean) => {
  return request('login/qr/create', 'get', {
    key,
    qrimg,
    timeStamp: String(Date.now())
  })
}


/**
  *二维码扫码状态获取
  *@param {String} key
  *@returns
  */
export const checkQrCode = (key: string) => {
  return request('login/qr/check', 'get', {
    key,
    timeStamp: String(Date.now())
  })
}

/**
  *获取登录状态
  *@param {}
  *@returns
  */
export const getLoginStatus = (cookie: string) => {
  return request('login/status', 'post', {
    timeStamp: String(Date.now()),
    cookie
  })
}
