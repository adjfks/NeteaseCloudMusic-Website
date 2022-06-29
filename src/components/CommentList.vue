<script setup lang="ts">
import { getCommentOfPlaylistById } from '@/api/playlist'
import { formatTime } from '@/utils/time'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const commentList = ref([] as any)
const params = reactive({
  id: props.id,
  offset: 0,
  limit: 20,
})

const loading = ref(false)
const more = ref(true)
const triggerGetComment = () => {
  loading.value = true
  getCommentOfPlaylistById(params).then((res: any) => {
    // console.log(`offset: ${params.offset}`);
    // console.log(res);
    // 是否有更多
    more.value = res.more
    commentList.value.push(...res.comments)
    loading.value = false
  })
}

triggerGetComment()

const load = () => {
  if (!more.value) return
  params.offset += params.limit
  triggerGetComment()

}
</script>

<template>
  <div class="comment-list">
    <h3>最新评论</h3>
    <!-- 评论列表 -->
    <ul class="list" v-infinite-scroll="load" v-if="commentList.length"
        infinite-scroll-distance="100">
      <li class="list-item" v-for="item in (commentList as any[])"
          :key="item.commentId">
        <!-- 左侧头像 -->
        <div class="user-avatar">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <!-- 右侧评论 -->
        <div class="comment-main">
          <!-- 评论 -->
          <div class="comment">
            <a class="nickname" href="javascript:;">{{ item.user.nickname }}</a>
            <span>: {{ item.content }}</span>
          </div>
          <!-- 回复 -->
          <div class="reply" v-if="item.beReplied.length">
            <a class="nickname" href="javascript:;">{{
                item.beReplied[0].user.nickname
            }}</a>
            <span>{{ item.beReplied[0].content }}</span>
          </div>
          <!-- 信息操作栏 -->
          <div class="msg-operation">
            <div class="msg">
              <span>{{ formatTime(item.time, 'M月DD日 hh:mm') }}</span>
            </div>
            <div class="operation">
              <i-carbon-thumbs-up v-if="true" />
              <i-carbon-thumbs-up-filled v-else />
              <i-ri-share-forward-line ml-2 />
              <i-carbon-chat ml-2 />
            </div>
          </div>
        </div>
      </li>
      <!-- loading -->
      <div v-loading="loading"></div>
      <div v-if="!more">木有更多啦~</div>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.comment-list {


  // 评论列表
  .list {


    .list-item {
      display: flex;
      font-size: 13px;
      color: var(--light-black);
      padding-top: 15px;
      border-bottom: 1px solid #f2f2f2;

      .user-avatar {

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
      }

      .comment-main {
        flex: 1;

        .nickname {
          color: #507daf;
        }

        // 评论
        .comment {
          padding: 10px;
          line-height: 20px;
        }

        // 回复
        .reply {
          padding: 10px;
          background-color: var(--light-gray);
          border-radius: 10px;
          margin: 0 5px;
        }

        // 信息操作栏
        .msg-operation {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          font-size: 12px;
          color: #9f9f9f;
        }
      }
    }
  }
}
</style>

