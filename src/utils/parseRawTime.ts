/**
  *转换形如'00:00:00' '00:00'的字符串为秒数
  *@param {String} raw
  *@returns
  */
export default function parseRawTime(raw: string): number {
  // raw: '00:00:00' '00:00'
  const arr = raw.trim().split(':')
  if (arr.length === 2) {
    return +arr[0] * 60 + (+arr[1])
  } else if (arr.length === 3) {
    return +arr[0] * 3600 + (+arr[1] * 60) + +arr[0]
  } else {
    return 0
  }
}
