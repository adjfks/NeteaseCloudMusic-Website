<script setup lang="ts">
</script>

<template>
  <div class="music-header">
    <div class="header-left">
      <!-- logo -->
      <a href="javascript:;" class="logo">
        <img src="@/assets/logo.png" alt="网易云音乐" class="logo-image">
        <h1 class="logo-text">网易云音乐</h1>
      </a>
      <!-- 中间区域 -->
      <div class="header-middle">
        <!-- 箭头 -->
        <div class="arrow-box">
          <div class="icon-wrapper">
            <i-ic-round-keyboard-arrow-left
                                            style="font-size: 1.5em; color: #fff;" />
          </div>
          <div class="icon-wrapper">
            <i-ic-round-keyboard-arrow-right
                                             style="font-size: 1.5em; color: #ccc;" />
          </div>
        </div>
        <!-- 搜索 -->
        <div class="search-box">
          <i-carbon-search class="icon-search" />
          <input type="text" class="search-input">
        </div>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="header-right">
      <div class="avatar-box">
        <el-avatar
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span class="username">用户名称</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.music-header {
  min-height: 60px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--theme-color);
  padding-right: 20px;

  .header-left {
    display: flex;
    align-items: center;
    height: 100%;

    // logo
    .logo {
      display: block;
      height: 100%;

      .logo-image {
        float: left;
        height: 100%;
      }

      .logo-text {
        display: flow-root;
        line-height: 75px;
        color: #fff;
        font-size: 24px;
      }
    }

    // 中间区域
    .header-middle {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 50px;

      .arrow-box {
        display: flex;
        align-items: center;

        .icon-wrapper {
          display: flex;
          justify-self: center;
          align-items: center;
          width: 25px;
          height: 25px;
          background-color: rgba(234, 234, 234, .5);
          border-radius: 50%;
          margin: 0 0.5em;
        }
      }

      .search-box {
        position: relative;
        margin-left: 20px;

        .search-input {
          width: 150px;
          height: 1.5em;
          padding: 3px 10px 3px 40px;
          background-color: rgba(234, 234, 234, .5);
          border-radius: 13px;
        }

        .icon-search {
          position: absolute;
          top: 6px;
          left: 8px;
        }

      }
    }
  }

  // 右侧区域
  .header-right {
    display: flex;
    align-items: center;

    .avatar-box {
      display: flex;
      align-items: center;
      margin-left: 20px;

      .username {
        margin-left: 5px;
      }
    }
  }
}
</style>
