<script setup lang="ts">
import { getSongsByIds } from '@/api/playlist'
import { usePlayer } from '@/store/player'

const song = ref(undefined)
const route = useRoute()
console.log(route.params.id);

getSongsByIds(route.params.id as string).then((res: any) => {
  song.value = res.songs[0]
})

const player = usePlayer()


</script>

<template>
  <div class="detail-drawer">
    <!-- 顶部header -->
    <header>
      <div class="back">
        <i-carbon-chevron-down text="8 #fff" />
      </div>
      <div class=" right">
      </div>
    </header>

    <!-- 主体区域 -->
    <main v-if="song">
      <div class="main-left">
        <div class="record-play" :class="{ 'play': player.music.playing }">
          <img src="@/assets/record.png" alt="">
        </div>
        <div class="record" :class="{ 'play': player.music.playing }">
          <img :src="(song as any).al.picUrl" alt="">
        </div>

      </div>
      <div class="main-lyric"></div>
      <div class="main-right"></div>
    </main>
  </div>
</template>

<style lang="less" scoped>
.detail-drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
  background-image: linear-gradient(to top, rgb(255, 255, 255), #f3f3f3, rgb(207, 208, 207));


  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 20px;
  }

  main {
    display: flex;
    flex: 1;

    .main-left {
      position: relative;
      min-width: 0;
      flex: 1;


      .record-play {
        position: absolute;
        top: 8px;
        left: 175px;
        z-index: 500;
        transform-origin: 0% 0%;
        transition: transform .5s;

        &.play {
          transform: rotate(34deg);
        }
      }

      .record {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        border-radius: 50%;
        // overflow: hidden;
        border: 40px solid #191a1b;

        img {
          border-radius: 50%;
        }

        &::after {
          content: '';
          position: absolute;
          width: 150%;
          height: 150%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          background-color: transparent;
          border: 10px solid #d3d3d3;
          border-radius: 50%;
        }

        &.play {
          animation: play 3s linear infinite 0.2s;
        }
      }


    }

    .main-lyric {
      min-width: 0;
      flex: 1;
    }

    .main-right {
      min-width: 0;
      flex: 1;
    }
  }
}

@keyframes play {
  from {

    transform: translate(-50%, -50%) rotate(0);
  }

  to {

    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>

