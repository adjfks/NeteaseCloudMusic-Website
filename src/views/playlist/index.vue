<script setup lang = "ts">
import { Ref } from 'vue'
import { getPlaylistById } from '@/api/playlist'

const playlist: Ref<any> = ref({})
const route = useRoute()

const id: string = route.params.id as string

getPlaylistById(id).then((res: any) => {
  playlist.value = res.playlist
})

</script>

<template>
  <div class="playlist-detail-container">
    <header>
      <div class="cover">
        <Cover :picUrl="playlist.coverImgUrl" round />
      </div>
      <div class="msg">
        <div class="title">
          <span class="tag">歌单</span>
          <h3 class="name">{{ playlist.name }}</h3>
        </div>
        <div class="creator-msg">
          <img class="creator-avatar" :src="playlist.creator.avatarUrl" alt="">
          <a href="javascript:;" class="nickname">{{ playlist.creator.nickname
          }}</a>
          <span class="create-time">{{ playlist.createTime }}</span>
        </div>
      </div>
    </header>
  </div>
</template>

<style lang = "less" scoped >
.playlist-detail-container {

  header {
    display: flex;
    padding: 20px 20px;

    .cover {
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }

    .msg {
      flex: 1;

      .title {
        display: flex;
        margin-bottom: 10px;

        .tag {
          height: 15px;
          line-height: 15px;
          border: 1px solid var(--theme-color);
          color: var(--theme-color);
          border-radius: 3px;
          font-size: 14px;
        }

        .name {
          font-weight: 700;
          font-size: 22px;
        }
      }

      .creator-msg {

        display: flex;
        align-items: center;
        font-size: 12px;

        .creator-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .nickname {
          margin: 0 10px;
          color: var(--blue-color);
        }
      }
    }
  }
}
</style>

