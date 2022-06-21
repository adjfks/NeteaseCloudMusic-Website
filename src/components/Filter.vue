<script setup lang="ts">
import artcat from '@/api/constants/artcat'

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['change'])

const handleClick = (param: string, val: number | string) => {
  emit('change', { param, val })
}

</script>

<template>

  <div class="filter-container">
    <div class="cat-row" v-for="item in artcat" :key="item.tag">
      <div class="tag-name">{{ item.tag }}:</div>
      <div class="tag-list">
        <div class="tag-item h-cs" v-for="tag in item.list" :key="tag.name"
             :class="{ 'selected': tag.val === params[(item.param) as keyof typeof params] }"
             @click="handleClick(item.param, tag.val)">
          {{ tag.name }}</div>
      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
.filter-container {

  .cat-row {
    display: flex;
    font-size: 13px;
    padding: 10px 0;
    align-items: center;

    .tag-name {
      align-self: flex-start;
      width: 50px;
      color: var(--font-black);
      margin-top: 3px;
    }

    .tag-list {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fill, 70px);
      justify-items: center;
      grid-row-gap: 10px;

      .tag-item {
        color: var(--font-black);
        padding: 3px 15px;

        &.selected {
          background-color: #fef7f7;
          color: var(--theme-color);
          border-radius: 10px;
        }
      }
    }
  }


}
</style>

