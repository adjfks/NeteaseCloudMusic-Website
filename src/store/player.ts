import { defineStore } from 'pinia'
import { getMusicUrl } from '@/api/player'

export interface Music {
  playing: boolean,
  url: string,
  audioEl: HTMLAudioElement | null,
  totalTime: number,
  currentTime: number,
}

export interface Player {
  playlist: any[],
  currentIdx: number,
  music: Music,
  timer: ReturnType<typeof setTimeout> | undefined
}
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
        audioEl: null,
        totalTime: 0,
        currentTime: 0
      },
      timer: undefined
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
      // 更新当前音乐信息
      this.updateMusic()
    },
    // 更新当前音乐信息
    updateMusic() {
      getMusicUrl(this.currentId).then((res: any) => {
        const url = res.data[0].url
        this.music.url = url

        this.music.totalTime = Math.floor(this.playlist[this.currentIdx].dt / 1000)
        this.music.currentTime = 0

        if (!this.music.audioEl) {
          const audioEl = document.createElement('audio')
          audioEl.style.display = 'none'
          document.body.appendChild(audioEl)
          this.music.audioEl = audioEl
        }

        this.music.audioEl.src = this.music.url
        this.play()
      })
    },
    // 播放
    play() {
      console.log(this.music.audioEl);
      if (this.music.audioEl === null) return
      this.music.audioEl.play()
      this.music.playing = true
      // 进度条
      this.updateCurrentTime()

    },
    // 暂停
    pause() {
      if (!this.music.playing) return
      this.music.audioEl?.pause()
      this.music.playing = false
      // 暂停进度条
      clearTimeout(this.timer)
    },
    // 实时更新当前播放时间
    updateCurrentTime() {
      if (!this.music.audioEl) return console.log('audioEl not found');
      this.music.audioEl.ontimeupdate = (event) => {
        if (event.target === null) return
        this.music.currentTime = (event.target as any).currentTime
      }
    },
    // 拖拽进度条
    changeCurrentTime(time: number) {
      this.music.currentTime = time
      if (this.music.audioEl)
        this.music.audioEl.currentTime = time
    }
  }
})
