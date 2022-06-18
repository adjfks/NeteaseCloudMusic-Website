<script setup lang="ts">
import { getBanner, getPlaylist, getNewSong } from '@/api/discover'
import transformList from '@/utils/transformList'
import { Ref } from 'vue'

import Panel from '../components/Panel.vue'
import Card from '@/components/Card.vue'

/* 轮播图 */
const banners: Ref<Array<any>> = ref([])

getBanner().then((res: { code: number, banners: Array<any> }) => {
  banners.value = res.banners
})

const labelColor: any = {
  'red': '#cc4a4a'
}

/* 推荐歌单 */
const playlist: Ref<Array<any>> = ref([])
getPlaylist(12).then((res: any) => {
  playlist.value = res.result
})

const recommendPlaylist = computed(() => {
  return transformList(playlist.value, 2)
})

/* 最新音乐 */
const newitem: Ref<Array<any>> = ref([])
getNewSong(12).then((res: any) => {
  newitem.value = res.result
})

const newsonglist = computed(() => {
  return transformList(newitem.value, 4)
})

</script>


<template>
  <div class="recommend-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in banners" :key="item.targetId">
        <div class="carousel-picture">
          <img :src="item.imageUrl" alt="">
          <span class="type-label"
                :style="{ backgroundColor: labelColor[item.titleColor] }">{{
                    item.typeTitle
                }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <Panel title="推荐歌单">
      <el-row :gutter="20" v-for="row in recommendPlaylist">
        <el-col :span="4" v-for="item in row" :key="item.id">
          <Card :playlist="item" />
        </el-col>
      </el-row>
    </Panel>
    <!-- 最新音乐 -->
    <Panel title="最新音乐">
      <el-row :gutter="20" v-for="group in newsonglist">
        <el-col :span="8" v-for="item in group" :key="item.id">
          <Card :song="item" horizontal />
        </el-col>
      </el-row>
    </Panel>
  </div>
</template>

<style lang="less" scoped>
.recommend-container {
  height: 100%;
  width: 100%;

  // 轮播图
  .el-carousel__item {
    height: 100%;

    .carousel-picture {
      position: relative;
      height: 100%;

      img {
        border-radius: 10px;
        height: 100%;
      }

      .type-label {
        position: absolute;
        right: 0;
        bottom: 3px;
        padding: 5px;
        border-radius: 10px 0 10px 0;
        color: #fff;
      }
    }

  }

  .el-row {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
