import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/views/Layout.vue')

const Discover = () => import('@/views/discover/index.vue')
import discoverMenus from '@/api/constants/discover'

// 自动生成路由配置
const discoverChildren = discoverMenus.reduce((pre, cur) => {
  let child: RouteRecordRaw = {} as RouteRecordRaw
  child.path = cur.link as string
  child.component = () => import(`../views/discover/pages/${cur.component}.vue`)
  pre.push(child)
  return pre
}, [] as RouteRecordRaw[])


const Recommend = () => import('@/views/discover/pages/Recommend.vue')
const Playlist = () => import('@/views/discover/pages/Playlist.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {path: '/' , redirect: '/discover'},
      {
        path: '/discover', component: Discover, children: [
          { path: '/discover' , redirect: '/discover/recommend' },
          // { path: '/discover/recommend', component: Recommend },
          // { path: '/discover/playlist', component: Playlist }
          ...discoverChildren
        ]
      }
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
