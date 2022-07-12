<script setup lang="ts"></script>

<template>
  <NetAlign class="net-button h-cs">
    <slot />
  </NetAlign>
</template>

<style lang="less">
.net-button {
  border: 1px solid #9b9b9b;
  border-radius: 20px;
  padding: 3px 15px;
  color: #373737;

  &:hover {
    background-color: var(--theme-color);
    color: #fff;
    --border-color: var(--theme-color);
  }
}
</style>
