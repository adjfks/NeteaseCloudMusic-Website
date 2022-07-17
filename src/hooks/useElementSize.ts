import { Ref } from 'vue'

export type ElementSize = {
  width: Ref<number>
  height: Ref<number>
}

const useElementSize = (target: Ref) => {
  const width = ref(0)
  const height = ref(0)
  width.value = target.value.offsetHeight
  height.value = target.value.offsetWidth
  return {
    width,
    height,
  } as ElementSize
}

export default useElementSize
