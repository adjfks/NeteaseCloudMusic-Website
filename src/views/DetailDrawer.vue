<script setup lang="ts">
import { usePlayer } from '@/store/player'
import { getLyric } from '@/api/player'
import { Ref } from 'vue'
import parseRawTime from '@/utils/parseRawTime'
interface LyricItem {
  time: number
  rawTime: string
  text: string
}

const song = ref(undefined) as any
const lyric: Ref<LyricItem[]> = ref([])
const lyricLength = computed(() => lyric.value.length)

const player = usePlayer()
watch(
  () => player.currentIdx,
  () => {
    song.value = player.playlist[player.currentIdx]

    song.value &&
      getLyric(song.value.id).then((res: any) => {
        console.log(res)
        if (res.uncollected) return console.log('没有歌词')
        lyric.value = parseLrc(res.lrc.lyric)
        console.log(lyric.value)
        // 初始化索引
        activeIndex.value = initActiveIndex()
      })
  },
  {
    immediate: true,
  }
)

/* 歌词滚动功能 */
// 滚动条DOM
const scrollbar = ref()

// 获取激活歌词索引
const activeIndex = ref(0)
// 激活索引对应歌词时间值
const preTime = computed(() => lyric.value[activeIndex.value - 1]?.time)
const time = computed(() => lyric.value[activeIndex.value]?.time)
const nextTime = computed(() => lyric.value[activeIndex.value + 1]?.time)

// 更新激活歌词索引
watch(
  () => player.music.currentTime,
  (newVal, oldVal) => {
    if (time.value < newVal) {
      while (nextTime.value < newVal) {
        if (activeIndex.value < lyric.value.length) activeIndex.value++
      }
    } else if (time.value >= newVal) {
      while (preTime.value >= newVal) {
        if (activeIndex.value > 0) activeIndex.value--
      }
    }
    console.log('激活歌词更新了----->', activeIndex.value)

    // 设置滚动条位置
    scrollbar.value.setScrollTop(activeIndex.value * 54)
  }
)

// 歌词容器
const lyricContainer = ref()
let halfHeight = 0
let scrollStep = 0
onMounted(() => {
  // 歌词容器高度的一半
  const { y, bottom } = lyricContainer.value.getBoundingClientRect()
  halfHeight = Math.floor((bottom - y) / 2)
  console.log(halfHeight)
  // 设置容器上padding使第一句歌词居中
  const view = document.querySelector('.el-scrollbar__view') as HTMLElement
  view.style.paddingTop = `${halfHeight - 54}px`
})

// 激活对应歌词
// const handleScroll = (val: any) => { console.log(val.scrollTop) }

// 解析歌词
function parseLrc(lrc: string): LyricItem[] {
  const lrcArr = lrc.trim().split('\n')
  const result: LyricItem[] = []

  lrcArr.forEach((str) => {
    const arr = str
      .trim()
      .split(']')
      .map((item) => item.trim()) // '[00:00:000' , '歌词'
    if (!arr[1].trim()) return
    const lyricItem = {} as LyricItem
    lyricItem.rawTime = arr[0].slice(1, -3)
    lyricItem.text = arr[1]
    console.log(arr)
    lyricItem.time = parseRawTime(lyricItem.rawTime)
    result.push(lyricItem)
  })
  return result
}

// 初始化索引
function initActiveIndex() {
  const time = Math.floor(player.music.currentTime)
  console.log(time)

  let index
  for (let i = 0; i < lyric.value.length; i++) {
    if (time < lyric.value[i].time) {
      index = i - 1
      break
    }
  }
  console.log(index)

  return index || lyric.value.length - 1
}
</script>

<template>
  <div class="detail-drawer">
    <!-- 顶部header -->
    <header>
      <div class="back">
        <i-carbon-chevron-down text="8 #fff" />
      </div>
      <div class="right"></div>
    </header>

    <!-- 主体区域 -->
    <main v-if="song">
      <div class="main-left">
        <div class="record-play" :class="{ play: player.music.playing }">
          <img src="@/assets/record.png" alt="" />
        </div>
        <div class="record" :class="{ pause: !player.music.playing }">
          <img :src="(song as any).al.picUrl" alt="" />
        </div>
      </div>
      <div class="main-lyric">
        <!-- 歌曲名称 -->
        <div class="title">
          <h3 class="song-title">{{ song.name }}</h3>
          <p class="song-author">{{ song.ar[0].name }}</p>
        </div>
        <!-- 歌词列表 -->
        <ul class="lyric" ref="lyricContainer">
          <el-scrollbar ref="scrollbar">
            <li
              class="lyric-item"
              v-for="(item, idx) in lyric"
              :class="{ active: activeIndex === idx }"
            >
              {{ item.text }}
            </li>
          </el-scrollbar>
        </ul>
      </div>
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
  background-image: linear-gradient(
    to top,
    rgb(255, 255, 255),
    #f3f3f3,
    rgb(207, 208, 207)
  );

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
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;

    .main-left {
      position: relative;
      min-width: 0;
      flex: 1;

      .record-play {
        position: absolute;
        top: 0%;
        left: 50%;
        z-index: 500;
        transform-origin: 0% 0%;
        transition: transform 0.5s;

        &.play {
          transform: rotate(28deg);
        }
      }

      .record {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 230px;
        height: 230px;
        border-radius: 50%;
        // overflow: hidden;
        border: 40px solid #191a1b;
        animation: play 15s linear infinite 0.2s;

        img {
          border-radius: 50%;
        }

        &::after {
          content: '';
          position: absolute;
          width: 310px;
          height: 310px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          background-color: transparent;
          border: 10px solid #d3d3d3;
          border-radius: 50%;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .main-lyric {
      height: 100%;
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;

      .title {
        padding: 0 0 20px 0;
        text-align: center;

        .song-title {
          font-size: 24px;
          font-weight: 600;
          color: #353232;
        }

        .song-author {
          font-size: 18px;
          padding: 10px 0;
          color: #999291;
        }
      }

      .lyric {
        flex: 1;
        min-height: 0;
        transition: all 0.5s;

        .lyric-item {
          box-sizing: border-box;
          height: 54px;
          line-height: 54px;
          text-align: center;
          color: #646261;
          font-size: 14px;
          transition: all 0.7s;

          &.active {
            color: #000000;
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
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
