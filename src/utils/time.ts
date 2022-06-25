import 'dayjs/locale/zh-cn' // 导入本地化语言
import dayjs from 'dayjs'

dayjs.locale('zh-cn') // 使用本地化语言

export const formatTime = (time: number | string, format: string = 'YYYY-MM-DD') => {
  if (time === undefined || time === null) return ''
  time = Number(time)
  return dayjs(time).format(format)
}
