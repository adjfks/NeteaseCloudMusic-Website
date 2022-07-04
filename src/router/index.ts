import { createRouter, createWebHashHistory } from 'vue-router'
import discoverRoute from './discover'
import playlistRoute from './playlist'
import my from './my'
import { useUser } from '@/store/user'

const Layout = () => import('@/views/Layout.vue')
const Login = () => import('@/views/Login.vue')
const DetailDrawer = () => import('@/views/DetailDrawer.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', redirect: '/discover' },
      { path: '/login', component: Login },
      ...discoverRoute,
      ...playlistRoute,
      ...my,
    ],
    meta: { transition: 'slide-up' },
  },
  {
    path: '/song/detail',
    component: DetailDrawer,
    meta: { transition: 'slide-up' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

// 前置路由导航守卫
router.beforeEach((to, from) => {
  const user = useUser()
  console.log('to------>', to)
  console.log('from----->', from)
  // 访问需要登录的接口
  if (to.fullPath.startsWith('/my')) {
    if (user.cookie === '') {
      user.redirectUrl = from.fullPath
      router.push('/login')
    }
  }
})

export default router
