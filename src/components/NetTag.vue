<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: '',
    required: true,
  },
})
</script>

<template>
  <span class="tag">
    {{ text }}
  </span>
</template>

<style lang="less" scoped>
.tag {
  padding: 0 2px;
  border: 1px solid var(--theme-color);
  border-radius: 5px;
  font-size: 12px;
  color: var(--theme-color);
  font-weight: 700;
}
</style>
