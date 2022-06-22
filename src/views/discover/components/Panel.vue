<script setup lang="ts">

interface Props {
  title: string
}

const props = defineProps<Props>()
</script>


<template>
  <div class="panel">
    <div class="panel-header">
      <router-link to="/">
        <h3 class="panel-title">{{ props.title }}</h3>
        <i-ic-round-keyboard-arrow-right style="font-size: 1.5em;" />
      </router-link>
    </div>
    <slot />
  </div>
</template>


<style lang="less" scoped>
.panel {

  .panel-header {
    height: 50px;
    margin-bottom: 10px;

    &>a {
      display: flex;
      align-items: center;
      height: 100%;

      .panel-title {
        font-size: 18px;
      }
    }




  }
}
</style>
