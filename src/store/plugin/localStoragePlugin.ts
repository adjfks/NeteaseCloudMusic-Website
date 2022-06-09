import { PiniaPluginContext , StateTree } from 'pinia'

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
function setLocalStorage(mutationId: string, state: StateTree):Promise<string> {
  return new Promise((resolve, reject) => {
    localStorage.setItem(mutationId, JSON.stringify(state))
    resolve('success')
  })
}

export default function localStoragePlugin(options: LocalStoragePluginOptions) {
  // 获取要持久化的pinia store数组
  const storeIds = options.storeIds

  return (ctx: PiniaPluginContext) => {
    const store = ctx.store
    store.$subscribe((mutation, state) => {
      if (!isInStores(storeIds, mutation.storeId)) return
      setLocalStorage(mutation.storeId, state)
      console.log(`store ${mutation.storeId} successfully`);
      
    })
    
  }
}
