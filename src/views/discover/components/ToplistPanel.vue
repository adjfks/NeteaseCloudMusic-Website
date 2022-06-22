<script setup lang="ts">

const props = defineProps({
  list: {
    type: Object,
    default: null,
    required: true
  }
})
</script>

<template>
  <div class="toplist-panel-container">
    <div class="cover-container">
      <Cover :picUrl="list.coverImgUrl" :playCount="list.playCount" v-if="list"
             round />
    </div>
    <div class="songlist-container">
      <SongList :id="list.id" v-if="list"></SongList>
    </div>
  </div>
</template>

<style lang="less" scoped>
.toplist-panel-container {
  display: flex;
  height: 150px;

  .cover-container {
    width: 150px;
    height: 150px;
    margin-right: 1em;
  }

  .songlist-container {
    flex: 1;
  }
}
</style>

