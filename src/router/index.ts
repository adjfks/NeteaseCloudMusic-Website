import { createRouter, createWebHashHistory } from 'vue-router'
import discoverRoute from './discover'

const Layout = () => import('@/views/Layout.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', redirect: '/discover' },
      ...discoverRoute
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router
