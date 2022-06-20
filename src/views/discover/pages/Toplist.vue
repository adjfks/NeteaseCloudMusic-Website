<script setup lang="ts">
import { Ref } from 'vue'
import { getToplist } from '@/api/discover'
import transformList from '@/utils/transformList';

import ToplistPanel from '../components/ToplistPanel.vue';
import ToplistCard from '../components/ToplistCard.vue';

const list: Ref<Array<any>> = ref([])
getToplist().then((res: any) => {
  list.value = res.list
})

const panelList = computed(() => {
  return list.value.slice(0, 4)
})

const cardList = computed(() => {
  const temp = list.value.slice(4)
  return transformList(temp, Math.ceil(temp.length / 6))
})

</script>

<template>
  <el-scrollbar>
    <main class="toplist-container" v-loading="!list.length">
      <!-- 官方榜 -->
      <div class="official-toplist">
        <h3 class="toplist-title">官方榜</h3>
        <div class="panel" v-for="item in panelList" :key="item.id">
          <ToplistPanel :list="item" />
        </div>
      </div>
      <!-- 全球榜 -->
      <div class="global-toplist">
        <h3 class="toplist-title">全球榜</h3>
        <el-row :gutter="20" v-for="(list, idx) in cardList" :key="idx"
                v-if="cardList.length" ma-4>
          <el-col :span="4" v-for="item in list" :key="(item as any).id">
            <ToplistCard :list="item" />
          </el-col>
        </el-row>
      </div>
    </main>
  </el-scrollbar>

</template>

<style lang="less" scoped>
.toplist-container {
  padding: 0 10px;
  min-height: 100%;

  .official-toplist {
    .toplist-title {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 10px;
    }

    .panel {
      margin-bottom: 20px;
    }
  }


}
</style>

