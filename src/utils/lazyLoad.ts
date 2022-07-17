import { App } from 'vue'
import defaultImg from '@/assets/logo.png'

const defineDirective = (app: App<Element>) => {
  app.directive('lazyload', {
    mounted(el, binding) {
      // 创建观察者
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          // 进入可视区
          if (isIntersecting) {
            // 停止观察该元素
            observer.unobserve(el)
            console.log('进入可视区')

            el.onerror = () => (el.src = defaultImg)
            el.src = binding.value
            console.log(binding.value)
          }
        },
        { threshold: 0.01 }
      )
      observer.observe(el)
    },
  })
}

export default {
  install(app: App<Element>) {
    defineDirective(app)
  },
}
