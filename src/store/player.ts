import { defineStore } from 'pinia'
import { getMusicUrl } from '@/api/player'

export interface Music {
  playing: boolean,
  url: string,
  audioEl: HTMLAudioElement | null
}
export const usePlayer = defineStore('player', {
  state: () => {
    return {
      // 播放列表
      playlist: [] as any,
      // 当前歌曲
      currentIdx: -1,
      music: {
        playing: false,
        url: '',
        audioEl: null
      } as Music
    }
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
    play() {
      console.log(this.music.audioEl);
      if (this.music.audioEl === null) return
      this.music.audioEl.play()
      this.music.playing = true
    },
    pause() {
      if (!this.music.playing) return
      this.music.audioEl?.pause()
      this.music.playing = false
    }
  }
})
