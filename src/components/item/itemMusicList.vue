<template>
  <div class="box">
    <div style="height: 20px"></div>
    <div class="top">
      <div>
        <svg class="bofang" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
      </div>
      <div class="playNumber">播放全部</div>
      <div class="playnumber">{{ length }}</div>
      <div class="like-box">
        <div class="xihuan-box">
          <svg class="xihuan" aria-hidden="true">
            <use xlink:href="#icon-xihuan"></use>
          </svg>
        </div>
        <div class="count">{{ Count(subscribedCount) }}人收藏</div>
      </div>
    </div>
    <!-- 一行歌曲内容 -->
    <div
      v-for="(item, i) in playMusic"
      :key="i"
      class="every"
      :class="{ newEvery: i % 2 == 0 }"
    >
      <!-- 数量 -->
      <div class="number">{{ i + 1 }}</div>
      <!-- 歌曲图片 -->
      <div class="d-img" @click="playMusicList(i)">
        <img :src="item.al.picUrl" />
      </div>
      <div class="text" @click="playMusicList(i)">
        <!-- 歌曲名称 -->
        <div class="name">{{ item.name }}</div>
        <!-- 作者姓名 -->
        <div v-for="count in item.ar" class="a-name">{{ count.name }}</div>
      </div>
      <!-- 播放图标 -->
      <div></div>
    </div>
    <div style="height: 60px"></div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {
    console.log(props);
    // 处理收藏量的数字转为万
    function Count(value) {
      if (value >= 10000) {
        return (value / 10000).toFixed(1) + "万";
      }
    }
    return { Count };
  },
  props: {
    // 歌单播放量
    subscribedCount: {},
    playMusic: {},
    // 歌曲数量
    length: {},
  },
  methods: {
    playMusicList(value) {
      this.updatePlayMusic(this.playMusic);
      this.updateplayMusicIndex(value);
    },
    ...mapMutations(["updatePlayMusic", "updateplayMusicIndex"]),
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: auto;
  background-color: #f8f9f9;
  border-radius: 39px 39px 0px 0px;
  margin-top: 30px;
}
.every {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.d-img img {
  width: 100px;
  height: 100px;
  border-radius: 40px;
}
.text {
  width: 300px;
}
.name {
  font-size: 30px;
  font-weight: 600;
  width: 400px;
}

.a-name {
  font-size: 25px;
}
.number {
  font-size: 30px;
  width: 10px;
  height: 10px;
  margin-top: 30px;
  font-weight: 600;
  margin-left: 30px;
}

.top {
  height: 90px;
  width: 100%;
  // border: 1px black solid;
  display: flex;
  justify-content: space-between;
}
.playNumber {
  position: absolute;
  font-size: 35px;
  margin-left: 110px;
  margin-top: 3px;
}
.playnumber {
  position: absolute;
  font-size: 25px;
  margin-left: 260px;
  margin-top: 15px;
  color: gray;
}
.count {
  font-size: 30px;
  color: #a9a9a9;
  position: absolute;
  right: 10px;
}
.bofang {
  width: 60px;
  height: 60px;
  margin-left: 30px;
}
.xihuan {
  width: 51px;
  height: 51px;
  position: absolute;
  top: 20px;
  left: 15px;
}
.like-box {
  display: flex;
  justify-content: space-between;
  background-color: #dcdcdc;
  width: 300px;
  height: 70px;
  position: relative; //之前用的绝对路径，导致不适配移动端
  right: 10px;
  bottom: 10px;
  line-height: 70px;
  border-radius: 50px;
}
.xihuan-box {
  width: 80px;
  height: 80px;
  background-color: #f5f5f5;
  border-radius: 100%;
  position: absolute;
  bottom: 0.5px;
  right: 225px;
}
</style>
