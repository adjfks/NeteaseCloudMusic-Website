<script setup lang="ts">
import Filter from '@/components/Filter.vue'
import { Ref } from 'vue'
import { getArtistList } from '@/api/discover'
import transformList from '@/utils/transformList'

const params = reactive({
  area: -1,
  type: -1,
  initial: -1,
  limit: 30,
})
const offset = ref(0)

const paramsChange = (val: { param: any; val: any }) => {
  params[val.param as keyof typeof params] = val.val
}

/* 展示歌手列表 */
const artlist: Ref<any> = ref([])

/**
 *触发请求歌手列表
 *@param {Boolean} toogle 是否为参数变化触发，false为滚动触发
 *@returns
 */
const triggerGetArtistList = (toogle?: boolean) => {
  if (toogle) {
    // 参数切换或第一次触发
    artlist.value = []
    offset.value = 0
    console.log('参数改变获取数据', `offset: ${offset.value}`)
  } else {
    offset.value += params.limit
    console.log('滚动获取数据==========>', `offset: ${offset.value}`)
  }
  getArtistList(
    params.area,
    params.type,
    params.initial,
    params.limit,
    offset.value
  ).then((res: any) => {
    // 数据分组
    const list = transformList(res.artists, params.limit / 6)
    list.map((arr) => {
      arr.forEach((item) => (item.loading = true))
    })
    artlist.value.push(...list)
  })
}

watch(
  params,
  (newVal, oldVal) => {
    triggerGetArtistList(true)
  },
  { immediate: true }
)
</script>

<template>
  <el-scrollbar>
    <div
      class="artlist-container"
      v-infinite-scroll="triggerGetArtistList"
      infinite-scroll-distance="100"
    >
      <!-- 筛选组件 -->
      <div class="filter">
        <Filter :params="params" @change="paramsChange" />
      </div>
      <!-- 无限滚动歌手列表 -->
      <div class="art-list">
        <el-row :gutter="20" v-for="(row, idx) in artlist" :key="idx">
          <el-col :span="4" v-for="item in row" :key="item.accountId">
            <div class="card-wrapper">
              <!-- 图片 -->
              <Cover :picUrl="item.picUrl" skeleton="132px" />
              <!-- 信息 -->
              <div class="msg">
                <div class="name h-cs">{{ item.name }}</div>
                <i-carbon-user-avatar-filled text="3" class="icon h-cs" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 骨架屏 -->
    </div>
  </el-scrollbar>
</template>

<style lang="less" scoped>
.artlist-container {
  .filter {
  }

  .art-list {
    .el-row {
      margin: 10px 0;
      width: 100%;

      .card-wrapper {
        :deep(img) {
          height: 132px;
        }

        .msg {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .name {
            font-size: 12px;
            color: var(--font-black);
          }

          .icon {
            color: var(--theme-color);
          }
        }
      }
    }
  }
}
</style>
