<template>
  <div class="top" v-if="isrecommend">
    <div class="title">每 日 推 荐</div>
    <!-- 轮播 -->
    <van-swipe :loop="false" :show-indicators="false" :width="200">
      <van-swipe-item v-for="item in dailySongs" :key="item">
        <div @click="playMusicList(item)" class="box">
          <!-- 歌曲图片 -->
          <img :src="item.al.picUrl" class="img" />
          <!-- 歌曲名称 -->
          <div class="al_name">{{ item.al.name }}</div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="line"></div>
  </div>
  <!-- 数据还没加载的页面 -->
  <div class="text" v-if="!isrecommend">还未登录，登录后将解锁</div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dailySongs: [],
      width: 0,
      rem: 0,
    };
  },
  computed: { ...mapState(["isrecommend"]) },
  mounted() {
    // 获取每日推荐
    if (this.isrecommend) {
      axios.defaults.withCredentials = true; //允许跨域携带cookie信息
      axios.get("http://1347440.gnway.cc:80/recommend/songs").then((res) => {
        this.dailySongs = res.data.data.dailySongs;
        console.log(this.dailySongs);
        console.log(res);
      });
    }

    // 调整歌单距离
    this.width = window.innerWidth;
    this.rem = this.width / 1.875;
  },

  methods: {
    // 实现歌曲播放功能，和搜索歌曲播放功能一样
    playMusicList: function (item) {
      // dailySongs
      this.$store.commit("pushPlayMusic", item);
      // push到playMusic数组里面,那下标就是最后一个了
      this.$store.commit(
        "updateplayMusicIndex",
        this.$store.state.playMusic.length - 1
      );
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  position: absolute;
  width: 100%;
  // 和上面歌单的距离
  border-top: 90px #f3f3f3 solid;
  height: 650px;
  // 和上面歌单的距离，数字越大就越远，并且还出来白色
  // bottom: -100px;
  background-color: #f3f3f3;
}
.title {
  position: absolute;
  font-size: 35px;
  font-weight: 600;
  left: 20px;
  width: 300px;
  height: 50px;
  top: -50px;
}
.img {
  width: 370px;
  height: 400px;
  margin-top: 10px;
  margin-left: 25px;
  border-radius: 10px;
  filter: brightness(95%);
}
.al_name {
  color: white;
  position: absolute;
  bottom: 30px;
  font-size: 30px;
  left: 50px;
  font-weight: 600;
}
.text {
  font-size: 35px;
  width: 100%;
  text-align: center;
  line-height: 250px;
  height: 650px;
}
</style>
