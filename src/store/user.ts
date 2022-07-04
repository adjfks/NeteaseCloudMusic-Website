import { defineStore } from 'pinia'
import { getCookie } from '@/api/login'

interface Visitor {
  userId: number | string
  createTime: number | string
}

interface Profile {
  nickname?: string
  avatarUrl?: string
  userId: number
}
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUser = defineStore('user', {
  state: () => {
    return {
      profile: {} as Profile,
      visitor: {} as Visitor,
      redirectUrl: '',
      account: null,
      isLogin: false,
      cookie: '',
    }
  },
  actions: {
    async setVisitor() {
      const { userId, createTime } = await getCookie()
      this.visitor.userId = userId
      this.visitor.createTime = createTime
    },
    setProfile(profile: any) {
      this.profile = profile
      this.isLogin = true
    },
    setAccount(account: any) {
      this.account = account
      this.isLogin = true
    },
    setRedirectUrl(url: string) {
      this.redirectUrl = url
    },
    removeLogin() {
      this.profile = {}
      this.account = null
      this.isLogin = false
    },
    setCookie(cookie: string) {
      this.cookie = cookie
    },
  },
})
