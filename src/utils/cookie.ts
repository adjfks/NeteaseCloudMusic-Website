export const setCookie = (cookie: string, hours?: number) => {
  let time
  if (hours) time = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString()
  document.cookie = ''
  document.cookie = time ? cookie + time : cookie
}
