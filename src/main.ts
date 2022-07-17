import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import '@/styles/common.less'
import '@/styles/normalize.less'
import '@/styles/reset.less'
// import '@/styles/variable.less'
// 导入数据持久化插件
import localStoragePlugin from '@/store/plugin/localStoragePlugin'
import 'uno.css'
// 导入主题色初始化函数
import { initTheme } from './utils/theme'
// 导入图片懒加载插件
import lazyload from '@/utils/lazyLoad'
initTheme()

const pinia = createPinia()
pinia.use(
  localStoragePlugin({
    storeIds: ['user', 'player'],
  })
)

const app = createApp(App)
app.use(pinia).use(router).use(lazyload).mount('#app')
