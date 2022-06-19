<script setup lang="ts">
import { Ref } from 'vue'
import { getHighQualityPlaylist, getPlaylistByCat } from '@/api/discover'
import { BoutiquePlaylistPanel, CategoryPanel } from '../components'
import transformList from '@/utils/transformList'

// 获取滚动条
const scrollbar: any = ref(null)
// 加载
const loading = ref(false)

/* 获取一项精品歌单 */
const highQualityPlaylist: Ref<any> = ref([])
getHighQualityPlaylist(1).then((res: any) => {
  highQualityPlaylist.value = res.playlists[0]
})

/* 获取歌单列表 */
interface Pager {
  playlist: Array<any>,
  total: number,
  pageSize: number,
  currentPage: number
}
const pager: Pager = reactive({
  playlist: [],
  total: 0,
  pageSize: 60,
  currentPage: 1
})
const offset = computed(() => {
  return (pager.currentPage - 1) * pager.pageSize
})

// 获取歌单列表数据
const getPlayList = (limit = 60, cat?: string,) => {
  loading.value = true
  getPlaylistByCat({ limit, cat, offset: offset.value }).then((res: any) => {
    pager.playlist = res.playlists
    pager.total = res.total
    loading.value = false
  })
}

getPlayList()
// 监听页数变化
watch(offset, () => {
  pager.playlist = []
  getPlayList()
  scrollbar.value.setScrollTop(0)
})
const playlistGroups = computed(() => {
  return transformList(pager.playlist, 10)
})

</script>

<template>
  <el-scrollbar ref="scrollbar">
    <div class="playlist-container">
      <!-- 精品歌单 -->
      <BoutiquePlaylistPanel :title="highQualityPlaylist.name"
                             :picUrl="highQualityPlaylist.coverImgUrl" />
      <!-- 分类面板 -->
      <div class="category-panel-contanier">
        <CategoryPanel />
      </div>

      <!-- 歌单列表 -->
      <div class="playlist" v-loading="loading" :style="{ minHeight: '200px' }">
        <el-row :gutter="20" v-for="row in playlistGroups"
                v-if="pager.playlist.length">
          <el-col :span="4" v-for="item in row" :key="item.id">
            <Card :content="item" :coverImgUrl="item.coverImgUrl" />
          </el-col>
        </el-row>
      </div>

      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination small background layout="prev, pager, next"
                       :total="pager.total" class="mt-4"
                       :page-size="pager.pageSize"
                       v-model:current-page="pager.currentPage" />
      </div>
    </div>
  </el-scrollbar>

</template>

<style lang="less" scoped>
.playlist-container {
  .category-panel-contanier {
    margin-top: 20px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  /* 分页组件 */
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
