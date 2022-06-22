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
    {{ label }}
  </div>
</template>

<style lang="less" scoped>
</style>

