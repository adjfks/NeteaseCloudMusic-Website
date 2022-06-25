import { defineStore } from 'pinia'
import { getMusicUrl } from '@/api/player'

export interface Music {
  playing: boolean,
  url: string,
  totalTime: number,
  currentTime: number,
}

export interface Player {
  playlist: any[],
  currentIdx: number,
  music: Music,
  audioEl: HTMLAudioElement
}


const audioEl = document.createElement('audio')
audioEl.style.display = 'none'
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
      },
      audioEl: audioEl,
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

        this.audioEl.src = this.music.url
        this.play()
      })
    },
    // 播放
    play() {
      if (this.music.playing) return
      this.audioEl.play()
      this.music.playing = true
      // 进度条
      this.updateCurrentTime()
    },
    // 暂停
    pause() {
      if (!this.music.playing) return
      this.audioEl.pause()
      this.music.playing = false
    },
    // 实时更新当前播放时间
    updateCurrentTime() {
      if (!this.audioEl) return console.log('audioEl not found');
      this.audioEl.ontimeupdate = (event) => {
        if (event.target === null) return
        this.music.currentTime = (event.target as any).currentTime
      }
    },
    // 拖拽进度条
    changeCurrentTime(time: number) {
      this.music.currentTime = time
      if (this.audioEl)
        this.audioEl.currentTime = time
    },
    // 自动播放下一首
    autoPlay() {
      this.updateMusic()
      // 监听ended事件
      if (this.audioEl)
        this.audioEl.onended = () => {
          // 下一首
          if (this.currentIdx === this.length - 1) return
          this.currentIdx++
          // 更新音乐信息
          this.updateMusic()
        }
    }
  }
})
