<script setup lang="ts">
import Filter from '@/components/Filter.vue'
const params = reactive({
  area: -1,
  type: -1,
  initial: -1
})
const paramsChange = (val: { param: any, val: any }) => {
  params[val.param as keyof typeof params] = val.val
  console.log(params);

}
</script>

<template>
  <el-scrollbar>

    <div class="artlist-container">
      <div class="filter">
        <Filter :params="params" @change="paramsChange" />
      </div>
      <div class="art-list"></div>
    </div>

  </el-scrollbar>
</template>

<style lang="less" scoped>
.artlist-container {
  .filter {}

  .art-list {}
}
</style>

