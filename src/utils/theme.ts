import { defaultThemeColor, darkThemeColor } from '@/config/theme-color.config'

const themeMap: Record<string, object> = {
  default: defaultThemeColor,
  dark: darkThemeColor,
}

// 当前主题色
const currentTheme = ref('default')

export const setTheme = () => {
  const rootEl = document.documentElement
  const theme = themeMap[currentTheme.value]
  Object.entries(theme).forEach(([key, value]) => {
    rootEl.style.setProperty(key, value)
  })
}

export const initTheme = () => {
  return setTheme()
}

export const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'default' ? 'dark' : 'default'
  setTheme()
}
