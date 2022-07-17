<script setup lang="ts">
import useVModel from '@/hooks/useVModel'
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
  },
  size: {
    type: String,
    default: '10px',
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const value = useVModel(props, 'modelValue', emits)
</script>

<template>
  <div class="net-slider" :style="{ width: props.size }">
    <el-slider
      v-model="value"
      size="small"
      :vertical="props.vertical"
      :height="props.height"
      :show-tooltip="props.showTooltip"
    />
  </div>
</template>

<style lang="less" scoped>
:deep(.el-slider) {
  display: block;
}

:deep(.el-slider.is-vertical .el-slider__runway) {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin: 0;
  width: 50%;
}

:deep(.el-slider.is-vertical .el-slider__button-wrapper) {
  top: auto;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 200%;
  aspect-ratio: 1 / 1;
  height: auto;
}

:deep(.el-slider__bar) {
  left: 50%;
  transform: translate(-50%);
}

:deep(.el-slider.is-vertical .el-slider__bar) {
  width: 100%;
}

:deep(.el-slider__button),
:deep(.el-slider__button-wrapper) {
  width: 100%;
  height: 100%;
}
</style>
