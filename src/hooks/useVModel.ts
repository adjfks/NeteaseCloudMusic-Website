export interface VModelOptions<T> {
  eventName?: string
}

function useVModel<P extends object, K extends keyof P, Name extends string>(props: P, key?: K, emit?: (name: Name, ...args: any[]) => void, options: VModelOptions<P[K]> = {},) {
  const {
    eventName
  } = options
  // 获取当前实例
  const vm = getCurrentInstance()

  const _emit = emit || vm?.emit



  if (!key) key = 'modelValue' as K
  let event = eventName || `update:${String(key)}`

  return computed<P[K]>({
    get() {
      return props[key as K]
    },
    set(value) {
      _emit && _emit(event as Name, value)
    }
  })
}

export default useVModel
