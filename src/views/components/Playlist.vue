<script setup lang="ts">
import { Ref } from 'vue'
import { getPlaylistById, getSongsByIds } from '@/api/playlist'
import { formatTime } from '@/utils/time'
import transformNumber from '@/utils/transformNumber'
import { usePlayer } from '@/store/player'

const route = useRoute()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

/* 获取歌单列表数据 */
const playlist = ref()
const songs = ref([])

async function getData() {
  playlist.value = (await getPlaylistById(props.id)).playlist

  const ids = playlist.value.trackIds.map((item: any) => item.id).join(',')

  songs.value = (await getSongsByIds(ids)).songs
}
getData()

/* tab切换 */
const activeName: Ref<'song' | 'comment'> = ref('song')
const handleClick = (tab: 'song' | 'comment') => {
  activeName.value = tab
}

// 双击击播放
const player = usePlayer()
const handleDblclick = async (val: { data: any; idx: number }) => {
  player.replacePlaylist(val.data, val.idx)
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
            <img
              class="creator-avatar"
              :src="playlist.creator.avatarUrl"
              alt=""
            />
            <a href="javascript:;" class="nickname">{{
              playlist.creator.nickname
            }}</a>
            <span class="create-time"
              >{{ formatTime(playlist.createTime) }}创建</span
            >
          </div>
          <div class="button-container">
            <NetButton mr-2 @click="handleDblclick({ data: songs, idx: 0 })">
              <i-carbon-play pr-1 />
              <span>播放全部</span>
            </NetButton>
            <NetButton mr-2>
              <i-carbon-add-alt pr-1 /><span
                >收藏({{ transformNumber(playlist.subscribedCount) }})</span
              >
            </NetButton>
            <NetButton mr-2>
              <i-carbon-share pr-1 /><span
                >分享({{ transformNumber(playlist.shareCount) }})</span
              >
            </NetButton>
            <NetButton mr-2>
              <i-carbon-download pr-1 /><span>下载全部</span>
            </NetButton>
          </div>
          <div class="detail">
            <div class="tag">
              <span mr-1>标签：</span>
              <span v-for="(item, idx) in playlist.tags" :key="item"
                >{{ item
                }}{{ idx === playlist.tags.length - 1 ? '' : ' / ' }}</span
              >
            </div>
            <div class="song">
              <span
                >歌曲：<span ml-1>{{ playlist.trackCount }}</span></span
              >
              <span ml-3
                >播放：<span ml-1>{{
                  transformNumber(playlist.playCount)
                }}</span></span
              >
            </div>
            <div class="description">
              <p class="ellipsis">简介：{{ playlist.description }}</p>
            </div>
          </div>
        </div>
      </header>
      <!-- 歌曲列表 -->
      <main>
        <NetTab v-model="activeName" @tab-click="handleClick">
          <NetTabPanel label="歌曲列表" name="song">
            <!-- 歌单表格 -->
            <NetTable
              v-if="songs.length"
              :data="songs"
              stripe
              @dblclick="handleDblclick"
            >
              <NetTableColumn type="index" width="50px" />
              <NetTableColumn label="操作" width="50px">
                <template #default>
                  <i-carbon-favorite text-3 mr-2 />
                  <i-carbon-download text-3 />
                </template>
              </NetTableColumn>
              <NetTableColumn label="标题" prop="name" />
              <NetTableColumn label="歌手" prop="ar[0].name" width="200px" />
              <NetTableColumn label="专辑" prop="al.name" width="200px" />
              <NetTableColumn
                label="时间"
                prop="dt"
                :filter="(val: any) => formatTime(val, 'mm:ss')"
                width="90px"
              />
            </NetTable>
          </NetTabPanel>
          <NetTabPanel :label="`评论(${playlist.commentCount})`" name="comment">
            <!-- 评论输入框组件 -->
            <CommentInput />
            <div class="comment-container">
              <CommentList :id="id" />
            </div>
          </NetTabPanel>
        </NetTab>
      </main>
    </div>
  </el-scrollbar>
</template>

<style lang="less" scoped>
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

  main {
    padding: 0 20px;
  }
}
</style>
