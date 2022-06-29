<script setup lang="ts">
const props = defineProps({
  banners: {
    type: Array,
    default: [],
    required: true
  }
})

const attrs = useAttrs()


const labelColor: any = {
  'red': '#cc4a4a'
}
</script>
<script lang="ts">
export default {
  name: 'NetCarousel',
  inheritAttrs: false
}
</script>

<template>
  <div class="net-carousel-container">
    <el-carousel v-bind="attrs">
      <el-carousel-item v-for="item in banners" :key="(item as any).targetId">
        <div class="carousel-picture">
          <img :src="(item as any).imageUrl" alt="">
          <span class="type-label"
                :style="{ backgroundColor: labelColor[(item as any).titleColor] }">{{
                    (item as any).typeTitle
                }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="less" scoped>
.net-carousel-container {
  height: 100%;

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
}
</style>

