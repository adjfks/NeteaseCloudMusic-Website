<script setup lang="ts">
import { Ref } from 'vue'
import { getSonglistDetail } from '@/api/discover'
const props = defineProps({
  id: {
    type: [Number, String],
    default: '',
    required: true
  },
  count: {
    type: Number,
    default: 5,
  }
})

const songlist: Ref<Array<any>> = ref([])
getSonglistDetail(props.id).then((res: any) => {
  songlist.value = res.playlist.tracks
})

const showList = computed(() => {
  return songlist.value.slice(0, props.count)
})


</script>

<template>
  <div class="songlist-container" ref="target">
    <template v-for="(item, idx) in showList" :key="item.id">
      <SongItem :name="item.name" :rank="idx + 1" :art="item.ar[0].name"
                :bg="idx % 2 === 0 ? 'var(--light-gray)' : ''" />
    </template>
  </div>
</template>

<style lang="less" scoped>
.songlist-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

