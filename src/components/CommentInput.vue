<script setup lang="ts">
const textarea = ref('')
</script>

<template>
  <div class="comment-input">
    <el-input v-model="textarea" :rows="3" type="textarea" maxlength="140"
              show-word-limit resize="none" />
    <div class="tool">
      <el-button round>评论</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tool {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  .el-button {}
}
</style>

