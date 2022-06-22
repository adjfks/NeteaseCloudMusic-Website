<script setup lang="ts">
const props = defineProps({
  rank: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  art: {
    type: String,
    required: true
  },
  bg: {
    type: String,
    default: '#fff'
  },
  height: {
    type: String,
    default: '40px'
  }
})


</script>

<template>
  <div class="song-item-container" :style="{ background: bg, height: height }">
    <div class="msg">
      <span class="rank" :class="{ 'theme-color': rank < 4 }">{{ rank
      }}</span>
      <span class="name">{{ name }}</span>
    </div>
    <div class="artist">
      {{ art }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.song-item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;

  &:hover {
    background-color: var(--gray);
    cursor: pointer;
  }


  .msg {
    font-size: 14px;
    color: var(--font-gray);

    .rank {
      margin-right: 10px;
    }

  }

  .artist {
    font-size: 13px;
    color: var(--font-gray);
  }
}
</style>

