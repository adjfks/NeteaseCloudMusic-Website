<script setup lang="ts">
const value = ref(0)
</script>

<template>
  <div class="net-volume">
    <div class="net-range">
      <NetSlider v-model="value" vertical height="100px" />
    </div>
    <div class="net-icon">
      <i-carbon-volume-down v-if="true" />
      <i-carbon-volume-mute v-else />
    </div>
  </div>
</template>

<style lang="less" scoped>
.net-range {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -10%);
  width: 20px;
  height: 100px;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background-color: #fff;
  box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3), inset 1px 2px 0 0 #fff;
  border-radius: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    border: 5px solid transparent;
    border-top: 5px solid #fff;
  }
}
</style>
