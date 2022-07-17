<script setup lang="ts"></script>

<template>
  <div class="net-volume">
    <el-slider vertical height="200px" size="small" />
  </div>
</template>

<style lang="less" scoped>
.net-volume {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -10%);
  width: 20px;
  height: 100px;
  background-color: pink;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    border: 5px solid transparent;
    border-top: 5px solid pink;
  }
}
</style>
