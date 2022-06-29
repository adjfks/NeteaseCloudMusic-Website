import { defineStore } from 'pinia'
import { getCookie } from '@/api/login'

interface Visitor {
  userId: number | string,
  createTime: number | string
}
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUser = defineStore('user', {
  state: () => {
    return {
      profile: null,
      visitor: {} as Visitor
    }
  },
  actions: {
    async setVisitor() {
      const { userId, createTime } = await getCookie()
      this.visitor.userId = userId
      this.visitor.createTime = createTime
    }
  }
})
