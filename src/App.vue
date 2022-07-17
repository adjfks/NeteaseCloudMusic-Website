<script setup lang="ts">
import { useUser } from '@/store/user'

const user = useUser()
user.setVisitor()
</script>

<template>
  <div id="app-content">
    <div class="app-panel">
      <!-- 一级路由 -->
      <main>
        <router-view v-slot="{ Component, route }">
          <transition
            :name="(route.meta.transition) as string || ''"
            mode="out-in"
          >
            <!-- <KeepAlive> -->
            <component :is="Component" />
            <!-- </KeepAlive> -->
          </transition>
        </router-view>
      </main>
      <!-- 底部footer -->
      <footer height="70px">
        <NetFooter />
      </footer>
    </div>
  </div>
</template>

<style lang="less">
#app-content {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100%;

  .app-panel {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-width: 1200px;
    // min-height: 600px;
    width: calc(100vw - 120px);
    height: calc(100vh - 60px);
    margin: 30px;
    // width: 100vw;
    // height: 100vh;
    box-sizing: border-box;
    // border: 1px solid rgba(203, 201, 201, .6);
    border-radius: 8px;
    box-shadow: 20px 0 20px 2px #e6e6e6, -20px 0 20px 2px #e6e6e6,
      0 20px 20px 2px #e6e6e6;

    main {
      position: relative;
      min-height: 0;
      flex: 1;
    }

    footer {
      height: 70px;
      box-sizing: border-box;
      border-top: 1px solid var(--border-color);
      padding: 0 20px;
      z-index: 9999;
      background-color: #fff;
    }
  }
}
</style>
