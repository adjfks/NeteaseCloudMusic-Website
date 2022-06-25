<script setup lang="ts">
import { usePlayer } from '@/store/player'
import { formatTime } from '@/utils/time'


const player = usePlayer()
const handleChange = (val: number) => {
  player.changeCurrentTime(val)
}
const currentMusic = player.playlist[player.currentIdx]

</script>

<template>
  <div class="net-player">
    <div class="controller">
      <i-ri-order-play-line />
      <i-carbon-skip-back-filled />
      <i class="play-icon">
        <i-carbon-play-filled-alt text="4" v-if="!player.music.playing"
                                  @click="player.play()" />
        <i-carbon-pause-filled v-else text="4" @click="player.pause()" />
      </i>
      <i-carbon-skip-forward-filled />
      <a href="javascript">词</a>
    </div>
    <div class="range">
      <span class="cur-time">{{ formatTime(player.music.currentTime * 1000,
          'mm:ss')
      }}</span>
      <el-slider :show-tooltip="false" v-model="player.music.currentTime"
                 :max="player.music.totalTime" @change="handleChange" />
      <span class="total-time">{{ formatTime(player.music.totalTime * 1000,
          'mm:ss')
      }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.net-player {
  width: 100%;
  height: 100%;
  user-select: none;


  .controller {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    font-size: 14px;
    color: #313131;
    margin: 10px auto 0;

    .play-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      background-color: #f4f4f4;
      border-radius: 50%;
    }

    svg:hover,
    a:hover {
      color: var(--theme-color);
      cursor: pointer;
    }
  }

  .range {
    display: flex;
    align-items: center;
    height: 20px;

    .el-slider {
      margin: 0 10px;

      :deep(.el-slider__button) {
        width: 8px;
        height: 8px;
        background-color: var(--theme-color);
        border: none;
      }

      :deep(.el-slider__button-wrapper) {
        width: 8px;
        height: 8px;
        top: -2px;
        transform: translate(-50%, -50%);
      }

    }
  }
}
</style>

