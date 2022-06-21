
import { RouteRecordRaw } from 'vue-router'
import discoverMenus from '@/api/constants/discover'

const Discover = () => import('@/views/discover/index.vue')

// 根据菜单栏自动生成路由配置
const discoverChildren = discoverMenus.reduce((pre, cur) => {
  let child: RouteRecordRaw = {} as RouteRecordRaw
  child.path = cur.link as string
  child.component = () => import(`../../views/discover/pages/${cur.component}.vue`)
  pre.push(child)
  return pre
}, [] as RouteRecordRaw[])

export default [
  {
    path: '/discover', component: Discover, children: [
      { path: '/discover' , redirect: '/discover/recommend' },
      ...discoverChildren
    ]
  }
]
