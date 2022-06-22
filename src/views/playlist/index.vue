<script setup lang = "ts">
import { Ref } from 'vue'
import { getPlaylistById } from '@/api/playlist'
import { formatTime } from '@/utils/time'
import transformNumber from '@/utils/transformNumber'

const playlist: Ref<any> = ref(null)
const route = useRoute()

const id: string = route.params.id as string

getPlaylistById(id).then((res: any) => {
  playlist.value = res.playlist
})

const activeName = ref('song')
const handleClick = (tab: string) => {
  activeName.value = tab
}
</script>

<template>
  <el-scrollbar>
    <div class="playlist-detail-container" v-if="playlist">
      <!-- 头部歌单信息模块 -->
      <header>
        <div class="cover">
          <Cover :picUrl="playlist.coverImgUrl" round />
        </div>
        <div class="msg">
          <div class="title">
            <span class="tag" mr-1>歌单</span>
            <h3 class="name">{{ playlist.name }}</h3>
          </div>
          <div class="creator-msg">
            <img class="creator-avatar" :src="playlist.creator.avatarUrl"
                 alt="">
            <a href="javascript:;" class="nickname">{{ playlist.creator.nickname
            }}</a>
            <span class="create-time">{{ formatTime(playlist.createTime)
            }}创建</span>
          </div>
          <div class="button-container">
            <NetButton mr-2>
              <i-carbon-play pr-1 /><span>播放全部</span>
            </NetButton>
            <NetButton mr-2>
              <i-carbon-add-alt pr-1 /><span>收藏({{
                  transformNumber(playlist.subscribedCount)
              }})</span>
            </NetButton>
            <NetButton mr-2>
              <i-carbon-share pr-1 /><span>分享({{
                  transformNumber(playlist.shareCount)
              }})</span>
            </NetButton>
            <NetButton mr-2>
              <i-carbon-download pr-1 /><span>下载全部</span>
            </NetButton>
          </div>
          <div class="detail">
            <div class="tag">
              <span mr-1>标签：</span>
              <span v-for="(item, idx) in playlist.tags" :key="item">{{ item
              }}{{
    idx === playlist.tags.length - 1 ? '' : ' / '
}}</span>
            </div>
            <div class="song">
              <span>歌曲：<span ml-1>{{ playlist.trackCount }}</span></span>
              <span ml-3>播放：<span ml-1>{{
                  transformNumber(playlist.playCount)
              }}</span></span>
            </div>
            <div class="description">
              <p class="ellipsis">简介：{{ playlist.description }}</p>
            </div>
          </div>
        </div>
      </header>
      <!-- 歌曲列表 -->
      <NetTab v-model="activeName" @tab-click="handleClick">
        <NetTabPanel label="歌曲列表" name="song" />
        <NetTabPanel label="评论" name="comment" />
      </NetTab>
    </div>
  </el-scrollbar>

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
      min-width: 400px;

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

      .button-container {
        margin: 25px 10px;
      }

      .detail {
        font-size: 14px;

        .tag {
          margin: 10px 0;
        }

        .song {
          margin: 10px 0;
        }

        .description {
          margin-top: 10px;
          width: 300px;
          height: 20px;
          line-height: 20px;
        }
      }
    }


  }
}
</style>

