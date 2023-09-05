<template>
  <div class="musicList">
    <div class="top">
      <div class="top-r">精 选 歌 单</div>
    </div>
    <!-- 轮播 -->
    <van-swipe
      :loop="false"
      class="myswpier"
      :show-indicators="false"
      :width="150"
    >
      <van-swipe-item
        v-for="item in state.musicList"
        :key="item"
        class="van-swipe-item1"
      >
        <router-link :to="{ path: '/ItemMusic', query: { id: item.id } }">
          <!-- 图片 -->
          <div class="m-img">
            <img :src="item.picUrl" class="img" />
          </div>
          <!-- 播放量和图标 -->
          <div class="i-play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofangliang"></use>
            </svg>
            <span class="playcount">{{ playCount(item.playCount) }}</span>
          </div>
          <!-- 标题 -->
          <p class="name">{{ item.name }}</p>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="line"></div>
</template>
<script>
import { onMounted } from "vue";
import { reactive } from "vue";
import { getMusicList } from "@/request/api/item";
export default {
  setup() {
    // 轮播获取数据
    const state = reactive({
      musicList: [],
    });
    let width;
    let rem;

    onMounted(async () => {
      // 获取歌单数据
      let res = await getMusicList();
      state.musicList = res.data.result;
      // 调整歌单距离
      width = window.innerWidth;
      rem = width / 2.5;
    });

    // 处理播放量的数字转为万
    function playCount(value) {
      if (value >= 10000) {
        return (value / 10000).toFixed(1) + "万";
      }
    }
    return { state, width, rem, playCount };
  },
};
</script>

<style lang="less" scoped>
.line {
  border: 15px #f3f3f3 solid;
  width: 100%;
}
.top {
  display: flex;
  flex-direction: row;
  margin-top: 300px;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
}
.top-r {
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 20px;
}

.musicContent {
  margin-top: 30px;
  .name {
    height: 30px;
  }
}
.m-img {
  position: relative;
  width: 250px;
  height: 250px;
}
/* 图片四个角变圆，设置上面的div没用，要设置img标签 */
img {
  width: 100%;
  height: 100%;
  border-radius: 20%;
  margin-left: 10px;
}
.playcount {
  font-weight: 600;
  color: aliceblue;
  font-size: 25px;
}
.icon {
  transform: scale(0.9);
}
.i-play {
  position: absolute;
  top: 0px;
  left: 30px;
}
.van-swipe-item1 {
  width: 0px;
}
.name {
  font-size: 10px;
  color: gray;
}
</style>
