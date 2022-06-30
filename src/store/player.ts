import { defineStore } from 'pinia'
import { getMusicUrl } from '@/api/player'
import { throttle } from 'lodash'

export interface Music {
  playing: boolean,
  url: string,
  totalTime: number,
  currentTime: number,
}

export interface Player {
  playlist: any[],
  currentIdx: number,
  music: Music
}


const audioEl = document.createElement('audio')
audioEl.style.display = 'none'
audioEl.setAttribute('use-credentials', 'true')
document.body.appendChild(audioEl)

export const usePlayer = defineStore('player', {
  state: () => {
    return {
      // 播放列表
      playlist: [],
      // 当前歌曲
      currentIdx: -1,
      music: {
        playing: false,
        url: '',
        totalTime: 0,
        currentTime: 0
      }
    } as Player
  },
  getters: {
    length: (state) => {
      return state.playlist.length
    },
    currentId: (state) => {
      return state.playlist[state.currentIdx].id
    }
  },
  actions: {
    // 替换播放列表
    replacePlaylist(list: Array<any>, idx: number) {
      // 清空playlist
      this.playlist.splice(0, this.length)
      this.playlist.push(...list)
      this.currentIdx = idx
      // 自动播放
      this.autoPlay()
    },
    // 更新当前音乐信息
    updateMusic() {
      getMusicUrl(this.currentId).then((res: any) => {
        const url = res.data[0].url

        this.music.url = url

        this.music.playing = false

        this.music.totalTime = Math.floor(this.playlist[this.currentIdx].dt / 1000)
        this.music.currentTime = 0

        audioEl.src = this.music.url
        this.play()
      })
    },
    // 播放
    play() {
      if (this.music.playing) return
      audioEl.play()
      this.music.playing = true
      // 进度条
      this.updateCurrentTime()
    },
    // 暂停
    pause() {
      if (!this.music.playing) return
      audioEl.pause()
      this.music.playing = false
    },
    // 实时更新当前播放时间
    updateCurrentTime() {
      if (!audioEl) return console.log('audioEl not found')
      audioEl.ontimeupdate = throttle((event) => {
        if (event.target === null) return
        this.music.currentTime = (event.target as any).currentTime
      }, 500)
    },
    // 拖拽进度条
    changeCurrentTime(time: number) {
      this.music.currentTime = time
      if (audioEl)
        audioEl.currentTime = time
    },
    // 自动播放下一首
    autoPlay() {
      this.updateMusic()
      // 监听ended事件
      if (audioEl)
        audioEl.onended = () => {
          // 下一首
          if (this.currentIdx === this.length - 1) return
          this.currentIdx++
          // 更新音乐信息
          this.updateMusic()
        }
    },
    // 上一曲或下一曲
    goMusic(step: -1 | 1) {
      if (step < 0 && this.currentIdx > 0) {
        this.currentIdx += step
        this.autoPlay()
      }
      if (step > 0 && this.currentIdx < this.playlist.length - 1) {
        this.currentIdx += step
        this.autoPlay()
      }
    },
    // 初始化
    initMusic() {
      this.music.playing = false
      if (this.music.url) {
        audioEl.src = this.music.url
        audioEl.currentTime = this.music.currentTime
      }
    }
  }
})
