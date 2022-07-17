<script setup lang="ts">
import { usePlayer } from '@/store/player'
const player = usePlayer()
const currentMusic = computed(() => {
  return player.playlist[player.currentIdx]
})

const router = useRouter()
const route = useRoute()
const handleRouter = () => {
  const path = route.path
  if (path.startsWith('/song/detail')) router.back()
  else router.push(`/song/detail`)
}
</script>

<template>
  <div class="net-footer">
    <div class="song-msg" v-if="currentMusic" @click="handleRouter">
      <div class="picture-wrapper">
        <img :src="currentMusic.al.picUrl" alt="" />
        <span class="layer">
          <i-carbon-chevron-up text="4 #fff " />
        </span>
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

    <div class="footer-right" v-if="currentMusic">
      <div class="volume-controller">
        <i-carbon-volume-down v-if="true" />
        <i-carbon-volume-mute v-else />
        <NetVolume />
      </div>
      <i-carbon-playlist />
    </div>
    <div v-else></div>
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
    width: 25%;

    .picture-wrapper {
      position: relative;
      width: 45px;
      height: 45px;
      overflow: hidden;
      border-radius: 10px;

      .layer {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.4s;

        &:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
    }

    .msg-box {
      align-self: center;
      padding: 0 5px;
      max-width: 200px;

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
    width: 25%;
    font-size: 16px;
    display: flex;
    justify-content: flex-end;

    .volume-controller {
      position: relative;
    }

    svg {
      padding: 0 10px;
    }
  }
}
</style>
