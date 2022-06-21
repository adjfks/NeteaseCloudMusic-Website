<script setup lang="ts">
import Filter from '@/components/Filter.vue'
import { Ref } from 'vue'
import { getArtistList } from '@/api/discover'
import transformList from '@/utils/transformList';

const params = reactive({
  area: -1,
  type: -1,
  initial: -1,
  limit: 30
})

const paramsChange = (val: { param: any, val: any }) => {
  params[val.param as keyof typeof params] = val.val
}


/* 展示歌手列表 */
const artlist: Ref<any> = ref([])

const triggerGetArtistList = () => {
  getArtistList(params.area, params.type, params.initial, params.limit).then((res: any) => {
    // 数据分组
    const list = transformList(res.artists, params.limit / 6)
    list.map(arr => {
      arr.forEach(item => item.loading = true)
    })
    console.log(list);
    artlist.value.push(...list)
  })
}

watch(params, (newVal, oldVal) => {
  console.log(newVal, oldVal);
  triggerGetArtistList()
}, { immediate: true })

const handleLoaded = (item: any) => {
  item.loading = false
}
</script>

<template>
  <el-scrollbar>

    <div class="artlist-container">
      <!-- 筛选组件 -->
      <div class="filter">
        <Filter :params="params" @change="paramsChange" />
      </div>
      <!-- 无限滚动歌手列表 -->
      <div class="art-list" v-if="artlist.length">
        <el-row :gutter="20" v-for="(row, idx) in artlist" :key="idx">
          <el-col :span="4" v-for="item in row" :key="item.accountId">
            <div class="card-wrapper">
              <!-- 图片骨架屏 -->
              <el-skeleton animated v-if="item.loading">
                <template #template>
                  <el-skeleton-item variant="image" style="height: 132px" />
                </template>
              </el-skeleton>
              <!-- 图片 -->
              <Cover :picUrl="item.picUrl" v-show="!item.loading"
                     @loaded="handleLoaded(item)"
                     @error="item.loading = false" />
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
  .filter {}

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

