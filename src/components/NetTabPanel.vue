<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})

const activeName = inject('activeName')
</script>

<template>
  <div class="net-tab-panel" v-if="activeName === $props.name">
    <slot />
  </div>
</template>

<style lang="less" scoped>
.net-tab-panel {
  height: 100%;
}
</style>

