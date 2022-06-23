<script setup lang="ts">
import useVModel from '@/hooks/useVModel';

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['tab-click'])
const activeName = useVModel(props, 'modelValue', emit, { eventName: 'tab-click' })


provide('activeName', activeName)
</script>

<template>
  <div class="net-tab">
    <div class="tab-header">
      <a :class="{ active: activeName === tab.props.name }" class="tab"
         href="javascript:;" v-for="tab in ($slots as any).default()"
         :key="tab.props.label" @click="activeName = tab.props.name">{{
             tab.props.label
         }}</a>
    </div>

    <slot />
  </div>
</template>

<style lang="less" scoped>
.net-tab {
  padding: 0 20px;

  .tab-header {
    margin-bottom: 10px;
    min-height: 35px;

    .tab {
      display: inline-block;
      font-size: 16px;
      margin-right: 20px;
      padding: 5px;
      transition: all .2s;

      &.active {
        border-bottom: 3px solid var(--theme-color);
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>

