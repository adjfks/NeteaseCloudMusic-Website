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
        currentTime: 0  // 以秒为单位
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
      this.updateMusic()
    },
    // 更新当前音乐信息之后自动播放
    async updateMusic() {
      await getMusicUrl(this.currentId).then((res: any) => {
        const url = `https://music.163.com/song/media/outer/url?id=${this.currentId}.mp3`

        this.music.url = url

        this.music.playing = false

        this.music.totalTime = Math.floor(this.playlist[this.currentIdx].dt / 1000)
        this.music.currentTime = 0

        audioEl.src = this.music.url

        console.log('更新音乐信息成功');
        this.play()
      })
    },
    // 直接自动播放播放
    play() {
      if (this.music.playing) return
      console.log('开始play');

      audioEl.play()
      this.music.playing = true
      // 进度条
      this.updateCurrentTime()
      // 播放完后自动播放
      this.autoPlay()
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
      }, 1000)
    },
    // 拖拽进度条
    changeCurrentTime(time: number) {
      this.music.currentTime = time
      if (audioEl)
        audioEl.currentTime = time
    },
    // 自动播放下一首
    autoPlay() {
      if (this.currentIdx === -1) this.updateMusic()
      // 监听ended事件
      if (audioEl)
        audioEl.onended = () => {
          // 下一首前先暂停
          this.music.playing = false
          // 下一首
          if (this.currentIdx === this.length - 1) return
          this.currentIdx++
          console.log(this.currentIdx);
          // 更新音乐信息
          this.updateMusic()

        }
    },
    // 上一曲或下一曲
    goMusic(step: -1 | 1) {
      if (step < 0 && this.currentIdx > 0) {
        this.currentIdx += step
        this.updateMusic()

      }
      if (step > 0 && this.currentIdx < this.playlist.length - 1) {
        this.currentIdx += step
        this.updateMusic()

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


/* 
http://m7.music.126.net/20220630211607/b14eafd305e2a91abd324b3f25a148fb/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/14051778144/74f5/2c66/b400/eab29fb52cac07613ee2f7b978c49ce2.mp3
*/
