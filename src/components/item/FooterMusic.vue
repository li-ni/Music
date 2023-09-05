<template>
  <div class="f-footer">
    <!-- 左边 -->
    <div class="left" @click="updateDetailShow">
      <!-- 图像 -->
      <div class="img">
        <img :src="playMusic[playMusicIndex].al.picUrl" />
      </div>
      <div class="mar_name">
        <Vue3Marquee>
          <!-- 歌名 -->
          <div class="name">{{ playMusic[playMusicIndex].name }}</div>
        </Vue3Marquee>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right">
      <!-- 播放 -->
      <svg class="icon" aria-hidden="true" v-if="btnShow" @click="play">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!-- 下一首 -->
      <svg class="icon" aria-hidden="true" @click="nextMusic">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <!-- 播放列表 -->
      <svg class="icon" aria-hidden="true" @click="list = true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <!-- 播放音乐 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playMusic[playMusicIndex].id}.mp3`"
    ></audio>
    <!-- 歌曲弹出层 -->
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playMusic[playMusicIndex]"
        :play="play"
        :btnShow="btnShow"
        :appMusicAllTime="appMusicAllTime"
      ></MusicDetail>
    </van-popup>
    <!-- 列表弹出层 -->
    <van-popup v-model:show="list" position="bottom" :style="{ height: '40%' }">
      <PlayMusicList></PlayMusicList>
    </van-popup>
    <!-- 提示弹出层 -->
    <van-popup v-model:show="tip" position="top" :style="{ height: '10%' }">
      <div style="height: 20px"></div>
      <div class="tip">
        该歌曲有CORB算法保护，获取不到资源，您需要换一首歌。
        <svg class="icon" aria-hidden="true" @click="list = true">
          <use xlink:href="#icon-broke_heart"></use>
        </svg>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import { mapState, mapMutations } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
import PlayMusicList from "@/components/item/PlayMusicList.vue";
export default {
  data() {
    // 定义一个值去触发updateTime函数
    return { intval: 0, list: false, index: 0, tip: false };
  },
  components: {
    MusicDetail,
    PlayMusicList,
    Vue3Marquee,
  },
  computed: {
    ...mapState(["playMusic", "playMusicIndex", "btnShow", "detailShow"]),
  },
  methods: {
    // 判断音乐是否播放
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updatebtnShow(false);
        this.updateTime(); //当歌曲播放就调用这个定时器
      } else {
        this.$refs.audio.pause();
        this.updatebtnShow(true);
        clearTimeout(intval); //当歌曲暂停就要清楚这个定时器
      }
    },
    // 获取当前时间，去调整歌词
    updateTime: function () {
      intval = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    // 添加歌曲总时长
    appMusicAllTime: function () {
      this.updateMusicAllTime(this.$refs.audio.duration);
    },
    // 点击下一首
    nextMusic() {
      this.$store.state.playMusicIndex = this.$store.state.playMusicIndex + 1;
    },
    ...mapMutations([
      "updatebtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateMusicAllTime",
    ]),
  },
  watch: {
    // 监听playMusicIndex是否变了
    playMusicIndex() {
      this.$refs.audio.autoplay = true;
      //监听播放图标;
      if (this.$refs.audio.paused) {
        this.updatebtnShow(false);
      }
      setTimeout(() => {
        if (this.$refs.audio.currentTime == 0) {
          this.tip = true;
          console.log(this.tip);
        }
      }, 2000);
    },
  },
  // 获取歌词
  mounted() {
    this.$store.dispatch("getLyric", this.playMusic[this.playMusicIndex].id);
    // 获取歌曲总时长
    this.appMusicAllTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playMusic[this.playMusicIndex].id);
  },
};
</script>
<style lang="less" scoped>
.f-footer {
  height: 100px;
  width: 90%;
  background-color: #e8e8e8;
  border-radius: 40px;
  left: 30px;
}
.right {
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
  margin-top: 30px;
  height: 30px;
}
.left {
  display: flex;
  justify-content: flex-start;
  top: 30px;
  left: 30px;
  position: absolute;
}
.icon {
  width: 40px;
  height: 40px;
  margin-left: 30px;
  z-index: 1;
}
img {
  width: 110px;
  height: 110px;
  border-radius: 100%;
}
.img {
  position: absolute;
  top: -40px;
  left: -35px;
}
.name {
  font-size: 30px;
  min-width: 250px;
  overflow: scroll;
}
.mar_name {
  position: absolute;
  left: 120px;
  width: 250px;
}
.tip {
  font-size: 27px;
  width: 100%;
  height: 50px;
  text-align: center;
  color: rgb(108, 107, 107);
}
</style>
