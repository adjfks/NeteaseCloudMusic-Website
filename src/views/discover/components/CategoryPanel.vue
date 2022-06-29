<script setup lang="ts">
import { Ref } from 'vue'
import { getHotCategory, getAllCategory } from '@/api/discover'
/* 获取热门歌单分类 */
const hotCategory: Ref<Array<any>> = ref([])
getHotCategory().then((res: any) => {
  hotCategory.value = res.tags
})

/* 抽屉 */
const drawer = ref(false)
const handleClose = (done: () => void) => {
  done()
}

// 获取全部歌单分类
const all: Ref<any> = ref(null)
const sub: Ref<Array<any>> = ref([])
const categories: Ref<any> = ref(null)
getAllCategory().then((res: any) => {
  all.value = res.all
  sub.value = res.sub
  categories.value = res.categories
})
const categorylist = computed(() => {
  const res: any = {}
  sub.value.forEach((item: any) => {
    if (!res[item.category]) res[item.category] = [item]
    else res[item.category].push(item)
  })
  return res
})

</script>

<template>
  <div class="category-panel">
    <div class="panel-left">
      <a href="javascript:;" @click="drawer = !drawer">
        <h3 class="panel-title">全部歌单</h3>
        <i-ic-round-keyboard-arrow-right style="font-size: 1em;" />
      </a>
      <!-- 抽屉组件 -->
      <el-drawer v-model="drawer" :show-close="false" direction="btt"
                 :before-close="handleClose" v-if="all" :with-header="false"
                 size="50%">
        <template #default>
          <h4 class="all">{{ all.name }}</h4>
          <el-row class="tag-line" :gutter="20"
                  v-for="(item, i) in categorylist" :key="i">


            <el-col :span="4" class="cat-title">{{ categories[i] }}</el-col>
            <el-col :span="20">
              <div class="cat-item-container">
                <span class="tag-item hover-font" v-for="tag in item"
                      :key="tag.resourceCount" @click="drawer = false">{{
                          tag.name
                      }}</span>
              </div>
            </el-col>
          </el-row>

        </template>
      </el-drawer>
    </div>
    <div class="panel-right">
      <span v-for="item in hotCategory">{{ item.name }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.category-panel {

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 左侧 */
  .panel-left {
    height: 50px;
    display: flex;
    align-items: center;

    // 分类按钮
    &>a {
      display: flex;
      align-items: center;
      height: 50%;
      width: max-content;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 0 1em;

      .panel-title {
        font-size: 14px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, .1);
      }
    }

    // 抽屉组件
    .el-drawer {
      .all {
        font-size: 14px;
        padding: 10px;
        border-bottom: 1px solid #ccc;
      }

      .tag-line {

        margin: 20px;

        .cat-title {
          font-size: 14px;
          color: #888;
        }

        .cat-item-container {
          .tag-item {
            display: inline-block;
            font-size: 14px;
            padding: 0 10px;
            margin-bottom: 20px;
          }
        }

      }


    }
  }

  /* 右侧 */
  .panel-right {
    span {
      padding: 10px;
      font-size: 12px;
      color: rgb(117, 115, 115);

      &:hover {
        color: #000;
        cursor: pointer;
      }
    }
  }

  :deep(.el-drawer__body) {
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #dedfe1;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 10px;
    }
  }
}
</style>

