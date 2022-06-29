import { defineStore } from 'pinia'
import { getCookie } from '@/api/login'

interface Visitor {
  userId: number | string,
  createTime: number | string
}

interface Profile {
  nickname?: string,
  avatarUrl?: string
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
      isLogin: false
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
    }
  }
})


/*
       {
   "code": 200,
   "account": {
       "id": 1426044843,
       "userName": "1_********800",
       "type": 1,
       "status": 0,
       "whitelistAuthority": 0,
       "createTime": 1523419730613,
       "tokenVersion": 0,
       "ban": 0,
       "baoyueVersion": 0,
       "donateVersion": 0,
       "vipType": 0,
       "anonimousUser": false,
       "paidFee": false
   },
   "profile": {
       "userId": 1426044843,
       "userType": 0,
       "nickname": "角落0摄氏",
       "avatarImgId": 109951163241629120,
       "avatarUrl": "http://p2.music.126.net/p02-OQs-IpWaERo0l6IG4g==/109951163241629115.jpg",
       "backgroundImgId": 109951162868128400,
       "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
       "signature": "",
       "createTime": 1523419795659,
       "userName": "1_********800",
       "accountType": 1,
       "shortUserName": "********800",
       "birthday": -2209017600000,
       "authority": 0,
       "gender": 1,
       "accountStatus": 0,
       "province": 440000,
       "city": 440300,
       "authStatus": 0,
       "description": null,
       "detailDescription": null,
       "defaultAvatar": false,
       "expertTags": null,
       "experts": null,
       "djStatus": 0,
       "locationStatus": 30,
       "vipType": 0,
       "followed": false,
       "mutual": false,
       "authenticated": false,
       "lastLoginTime": 1656518327008,
       "lastLoginIP": "223.74.34.92",
       "remarkName": null,
       "viptypeVersion": 0,
       "authenticationTypes": 0,
       "avatarDetail": null,
       "anchor": false
   }
}
       */
