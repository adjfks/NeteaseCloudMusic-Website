<script setup lang="ts">
import { usePlayer } from '@/store/player'
const player = usePlayer()
const currentMusic = computed(() => {
  return player.playlist[player.currentIdx]
})



</script>

<template>
  <div class="net-footer">
    <div class="song-msg" v-if="currentMusic">
      <div class="picture-wrapper"><img :src="currentMusic.al.picUrl" alt="">
      </div>
      <div class="msg-box" ml-2>
        <p class="song-name">{{ currentMusic.name }}</p>
        <p class="song-art" mt-1>{{ currentMusic.ar[0].name }}</p>
      </div>
      <div class="icon">
        <i-carbon-favorite mt-2 text-4 v-if="true" />
        <i-carbon-favorite-filled v-else />
      </div>
    </div>
    <div v-else></div>
    <!-- 音乐播放器 -->
    <div class="music-player">
      <NetPlayer :disabled="!currentMusic" />
    </div>

    <div class="footer-right">
      <i-carbon-volume-down v-if="true" />
      <i-carbon-volume-mute v-else />
      <i-carbon-playlist />
    </div>
  </div>
</template>

<style lang="less" scoped>
.net-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 13px;
  color: #666;

  .song-msg {
    display: flex;

    .picture-wrapper {
      width: 45px;
      height: 45px;
      overflow: hidden;
      border-radius: 10px;
    }

    .msg-box {
      align-self: center;
      padding: 0 5px;

      .song-name {
        font-weight: 700;
      }
    }
  }

  .music-player {
    width: 40%;
    height: 100%;
  }

  .footer-right {
    font-size: 16px;

    svg {
      padding: 0 10px;
    }
  }
}
</style>

