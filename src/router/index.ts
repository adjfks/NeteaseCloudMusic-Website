import { createRouter, createWebHashHistory } from 'vue-router'
import discoverRoute from './discover'
import playlistRoute from './playlist'

const Layout = () => import('@/views/Layout.vue')
const Login = () => import('@/views/Login.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', redirect: '/discover' },
      { path: '/login', component: Login },
      ...discoverRoute,
      ...playlistRoute
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
