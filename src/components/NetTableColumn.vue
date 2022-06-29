<script setup lang="ts">
interface Column {
  label?: string,
  prop?: string,
  type?: 'index',
  width?: string,
  filter?: (val: any) => typeof val,
  item?: any
}

const props = defineProps<Column>()

</script>

<template>
  <slot />
</template>

<style lang="less" scoped>
</style>
