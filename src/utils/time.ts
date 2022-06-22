import 'dayjs/locale/zh-cn' // 导入本地化语言
import dayjs from 'dayjs'

dayjs.locale('zh-cn') // 使用本地化语言

export const formatTime = (time: number | string) => {
  time = Number(time)
  return dayjs(time).format('YYYY-MM-DD')
}
