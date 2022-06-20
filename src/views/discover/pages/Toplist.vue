<script setup lang="ts">
import { Ref } from 'vue'
import { ToplistCover } from '../components'
import { getToplist } from '@/api/discover'

const list: Ref<Array<any>> = ref([])
getToplist().then((res: any) => {
  list.value = res.list
})
</script>

<template>
  <div class="toplist-container">
    <div class="cover-container">
      <ToplistCover :picUrl="list[0].coverImgUrl" :playCount="list[0].playCount"
                    v-if="list.length" round />
    </div>

  </div>
</template>

<style lang="less" scoped>
.toplist-container {
  .cover-container {
    width: 200px;
    height: 200px;
  }
}
</style>

