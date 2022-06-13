<script setup lang="ts">
import { getBanner } from '@/api/discover'
import { Ref } from 'vue'

const banners: Ref<Array<any>> = ref([])

getBanner().then((res: { code: number, banners: Array<any> }) => {
  console.log(res);
  banners.value = res.banners
})

const labelColor: any = {
  'red': '#cc4a4a'
}


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
  </div>
</template>

<style lang="less" scoped>
.recommend-container {
  .el-carousel__item {

    .carousel-picture {
      position: relative;

      img {
        border-radius: 10px;
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
