import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout.vue')

const Discover = () => import('@/views/discover/index.vue')
const Recommend = () => import('@/views/discover/pages/Recommend.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {path: '/' , redirect: '/discover'},
      {
        path: '/discover', component: Discover, children: [
          { path: '/discover' , redirect: '/discover/recommend' },
          { path: '/discover/recommend' , component: Recommend }
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
