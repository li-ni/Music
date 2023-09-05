<template>
  <div class="detail">
    <!-- 背景图片 -->
    <div>
      <img :src="musicList.al.picUrl" class="bgimg" />
    </div>
    <!-- 上部分 -->
    <div class="top">
      <div class="b-icon">
        <svg class="icon" aria-hidden="true" @click="updateDetailShow">
          <use xlink:href="#icon-xialajiantouxiao"></use>
        </svg>
      </div>
      <!-- 歌名和作者名 -->
      <Vue3Marquee class="mar_text">
        <div class="text-big">{{ musicList.name }}</div>
        <div v-for="arName in musicList.ar" class="text-small">
          ----- {{ arName.name }}
        </div>
      </Vue3Marquee>
    </div>
    <!-- 中间 -->
    <!-- 歌词 -->
    <div
      class="lyric_text"
      ref="musicText"
      v-show="!isIyric"
      @click="updateIsIyric"
    >
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pro,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="moddle" v-show="isIyric" @click="updateIsIyric">
      <!-- 磁针 -->
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="m-top"
        :class="{ m_top1: !btnShow }"
      />
      <!-- 圆盘 -->
      <img src="@/assets/disc-plus.png" alt="" class="m-footer" />
      <!-- 头像 -->
      <div class="m-moddle">
        <img
          :src="musicList.al.picUrl"
          class="m-img"
          :class="{ img_active: !btnShow, img_pauesd: btnShow }"
        />
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <!-- 进度条 -->
      <div class="f-moddle">
        <input
          type="range"
          class="range"
          min="0"
          :max="musicAllTime"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="f-footer">
        <!-- 上一首 -->
        <div class="b-icon" @click="goplay(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangyishou"></use>
          </svg>
        </div>
        <!-- 暂停播放 -->
        <div class="b-icon">
          <svg class="icon" aria-hidden="true" v-if="btnShow" @click="play">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </div>
        <!-- 下一首 -->
        <div class="b-icon" @click="goplay(1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiayishou"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isIyric: true,
    };
  },
  mounted() {
    // 获取歌曲总时长
    this.appMusicAllTime();
  },
  // 父子组件传值
  // 关闭歌曲详情页
  // 调用store的方法，只要点击就触发该方法，可以取反，就可以关闭了
  props: ["musicList", "play", "btnShow", "appMusicAllTime"],

  // computed有缓存
  computed: {
    ...mapState([
      "detailShow",
      "lyricList",
      "currentTime",
      "playMusicIndex",
      "playMusic",
      "musicAllTime",
    ]),
    // 对歌词进行分割，并且返回出一个对象，然后在模块进行遍历，去获取歌词部分就行
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
          // item是arr数组的元素
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }

          // 返回一个对象出去，然后调用lrc就行了。
          return { min, sec, mill, lrc, time };
        });
        // item.pro下一句歌词的时间
        arr.forEach((item, i) => {
          if (i == arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pro = 10000;
          } else {
            item.pro = arr[i + 1].time;
          }
        });
      }

      return arr;
    },
  },
  methods: {
    ...mapMutations(["updateDetailShow", "updateplayMusicIndex"]),
    // 切换磁盘和歌词
    updateIsIyric() {
      this.isIyric = !this.isIyric;
      console.log("调用了" + this.isIyric);
    },
    // 上一首和下一首的切换
    // 歌曲播放调用的play方法，这个方法是父组件传过来的，play主要是控制audio标签，
    //这个标签主要是playMusic数组的下标playMusicIndex来控制，
    //当进入MusicDetail组件时，切换歌曲就直接改变下标就行，因为有一个歌单的，是一个数组。
    goplay(value) {
      // 切换歌曲时，改变的下标
      let index = this.playMusicIndex + value;
      if (index < 0) {
        index = this.playMusic.length - 1;
      } else if (index == this.playMusic.length) {
        index = 0;
      }
      this.updateplayMusicIndex(index);
    },
  },
  watch: {
    // 监听当前时间，如果变了，就调用该函数
    // 把当前歌词固定在一个位置，其他歌词向前滚动
    currentTime: function (value) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicText.scrollTop = p.offsetTop - 300;
        }
      }
      // 进度条结尾时，自动切换到下一首歌
      if (this.musicAllTime == value) {
        if (this.playMusicIndex == this.playMusic.length - 1) {
          this.updateplayMusicIndex(0);
          this.play();
        } else {
          this.updateplayMusicIndex(this.$store.state.playMusicIndex + 1);
        }
      }
    },
  },
  components: {
    Vue3Marquee,
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  position: absolute;
  width: 100%;
  height: 100%;
  //icon图标在上面
  z-index: -1;
  // 背景虚化
  // brightness(70%)数值越大越明亮
  filter: blur(30px) brightness(70%);
}
.icon {
  // 填充颜色
  fill: white;
}
.vue3-marquee.horizontal {
  height: 50px;
  top: 10px;
  min-width: 200px;
  font-size: 30px;
  color: white;
  width: 600px;
  right: 50px;
}

.top {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.f-top {
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
}
.f-footer {
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 100%;
  margin-bottom: 30px;
  margin-left: 30px;
}
.f-moddle {
  margin-bottom: 50px;
  margin-left: 30px;
}
.m-top {
  width: 2.4rem;
  height: 4rem;
  left: 45%;
  transform: rotate(-25deg);
  transform-origin: 0 0;
  position: absolute;
  top: -150px;
}
.m_top1 {
  width: 2.4rem;
  height: 4rem;
  left: 45%;
  transform: rotate(-5deg);
  transform-origin: 0 0;
  position: absolute;
  top: -150px;
}

.m-footer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: -1;
}
.m-moddle {
  width: 65%;
  height: 65%;
  // border-radius: 100%;
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  // z-index: -1;
  // border: 1px blanchedalmond solid;
}
.m-img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  // 给图像添加动画效果
  animation: rotate_ar 10s linear infinite;
}
.img_active {
  animation-play-state: running;
}
.img_pauesd {
  animation-play-state: paused;
}
// 给图像添加动画效果
@keyframes rotate_ar {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.moddle {
  position: absolute;
  top: 20%;
  left: 15%;
  width: 70%;
}
.lyric_text {
  width: 100%;
  height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  color: white;
  font-size: 30px;
  margin-top: 130px;
  p {
    margin-bottom: 20px;
  }
}
// 下一句歌词的样式
.active {
  color: #bebebe;
  font-size: 35px;
}
.range {
  width: 100%;
  height: 3px;
}
</style>
