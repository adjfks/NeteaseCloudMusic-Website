import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import '@/styles/common.less'
import '@/styles/normalize.less'
import '@/styles/reset.less'
import '@/styles/variable.less'
// 导入数据持久化插件
import localStoragePlugin from '@/store/plugin/localStoragePlugin'

const pinia = createPinia()
pinia.use(localStoragePlugin({
  storeIds: []
}))

const app = createApp(App)
app.use(router).use(pinia).mount('#app')
