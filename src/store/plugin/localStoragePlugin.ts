import { PiniaPluginContext, StateTree } from 'pinia'
import { throttle } from 'lodash'

interface LocalStoragePluginOptions {
  storeIds: Array<string> | string
}

type WebStorage = WindowLocalStorage | WindowSessionStorage

// 判断是否需要持久化
function isInStores(storeIds: Array<string> | string, mutationId: string) {

  if (typeof storeIds === 'string') {
    return storeIds === mutationId
  } else {
    return storeIds.findIndex(storeId => storeId === mutationId) !== -1
  }
}

// 持久化操作
function setLocalStorage(mutationId: string, state: StateTree): Promise<string> {
  return new Promise((resolve, reject) => {
    localStorage.setItem(mutationId, JSON.stringify(state))
    resolve('success')
  })
}

// 获取本地持久化数据
function getLocalStorage(storeId: string) {
  return localStorage.getItem(storeId)
}

export default function localStoragePlugin(options: LocalStoragePluginOptions) {
  // 获取要持久化的pinia store数组
  const storeIds = options.storeIds

  return (ctx: PiniaPluginContext) => {
    const store = ctx.store
    // const localState = getLocalStorage(store.$id)
    // if (localState) {
    //   ctx.options.state = () => {
    //     return JSON.parse(localState)
    //   }
    // }
    // console.log(store);


    store.$subscribe(throttle((mutation, state) => {
      if (!isInStores(storeIds, mutation.storeId)) return
      setLocalStorage(mutation.storeId, state)
      console.log(`store ${mutation.storeId} successfully`);
    }, 1000))

  }
}
