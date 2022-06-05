import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import 'pinia'
// 导入数据持久化插件
import localStoragePlugin from '@/store/plugin/localStoragePlugin'

const pinia = createPinia()
pinia.use(localStoragePlugin({
  storeIds: ['main']
}))

createApp(App).use(router).use(pinia).mount('#app')
