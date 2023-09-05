<template>
  <div class="box">
    <div class="top">
      <h2 class="animate__animated animate__backInDown">Listen</h2>
      <p class="animate__animated animate__backInLeft">Music playback</p>
    </div>
    <div class="text">
      <h2
        v-if="arr_text[0]"
        class="in_0 animate__animated animate__backInRight"
      >
        面试官 您好
      </h2>
      <p v-if="arr_text[1]" class="in_1 animate__animated animate__swing">
        下面是该项目的简单介绍
      </p>
      <p
        v-if="arr_text[2]"
        class="in_1 animate__animated animate__lightSpeedInLeft"
      >
        项目简介：
      </p>
      <p v-if="arr_text[3]" class="in_2 animate__animated animate__backInLeft">
        该项目是一个适配于移动端的音乐网站，提供热门歌单，用户登录之后就有每日推荐的歌曲，可实现音乐播放。
      </p>
      <p
        v-if="arr_text[4]"
        class="in_1 animate__animated animate__lightSpeedInLeft"
      >
        项目技术：
      </p>
      <p v-if="arr_text[5]" class="in_2 animate__animated anJimate__backInLeft">
        本项目均是本人独立自主开发，所用技术栈：Vue+Vant+Axios+JavaScript。后端调用的是网易云开源API。
      </p>
      <p
        v-if="arr_text[6]"
        class="in_1 animate__animated animate__lightSpeedInLeft"
      >
        项目源码：
      </p>
      <p v-if="arr_text[7]" class="in_2 animate__animated animate__backInLeft">
        github:<a>https://github.com/li-ni/Music.git</a>
      </p>
      <p
        v-if="arr_text[8]"
        class="in_1 animate__animated animate__lightSpeedInLeft"
      >
        项目部署：
      </p>
      <p v-if="arr_text[9]" class="in_2 animate__animated animate__backInLeft">
        该项目是用了内网映射，所以数据加载比较慢，如果数据没加载出来，您可以Boss直聘联系我，或直接电联18874405762。
      </p>
      <p
        v-if="arr_text[10]"
        class="in_1 animate__animated animate__rotateInDownLeft"
      >
        谢谢您的使用！
      </p>
    </div>
  </div>
  <!-- 按钮 -->
  <div class="btn_click animate__animated animate__bounceInUp">
    <van-button
      color="linear-gradient(to right, #FFFACD, #EEE9BF)"
      @click="changBtn"
      size="large"
      block
      v-if="isShowBtn"
    >
      <div style="color: black">Click Music playback(点击)</div>
    </van-button>
  </div>
</template>
<style lang="less" scoped>
a {
  color: black;
}
.box {
  position: absolute;
  width: 90%;
  height: 94%;
  // border: 1px black solid;
  left: 5%;
  top: 3%;
  background-color: rgb(240, 240, 240);
  border-radius: 20px;
}
.top {
  margin-top: 100px;
  margin-left: 50px;
  font-size: 40px;
}
.text {
  font-size: 20px;
}
.in_0 {
  position: absolute;
  right: 20px;
  top: 130px;
  font-size: 40px;
}
.in_1 {
  font-size: 30px;
  margin-bottom: 15px;
  margin-top: 30px;
  margin-left: 10px;
}
.in_2 {
  font-size: 25px;
  margin-bottom: 25px;
  color: #828282;
  margin-right: 10px;
  margin-left: 15px;
}
.btn_click {
  position: absolute;
  bottom: 130px;
  width: 70%;
  left: 100px;
  color: black;
}
</style>
<script>
import "animate.css";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      arr_text: [],
      isShowBtn: false,
    };
  },

  methods: {
    ...mapMutations(["updateHomePage"]),
    // 控制首页
    changBtn: function () {
      this.updateHomePage();
    },
  },
  // 延时内容
  // 展示介绍内容
  mounted() {
    setTimeout(() => {
      this.arr_text.push(1);
      if (this.arr_text[0]) {
        setTimeout(() => {
          this.arr_text.push(1);
          if (this.arr_text[1]) {
            setTimeout(() => {
              this.arr_text.push(1);
              if (this.arr_text[2]) {
                setTimeout(() => {
                  this.arr_text.push(1);
                  if (this.arr_text[3]) {
                    setTimeout(() => {
                      this.arr_text.push(1);
                      if (this.arr_text[4]) {
                        setTimeout(() => {
                          this.arr_text.push(1);
                          if (this.arr_text[5]) {
                            setTimeout(() => {
                              this.arr_text.push(1);
                              if (this.arr_text[6]) {
                                setTimeout(() => {
                                  this.arr_text.push(1);
                                  if (this.arr_text[7]) {
                                    setTimeout(() => {
                                      this.arr_text.push(1);
                                      if (this.arr_text[8]) {
                                        setTimeout(() => {
                                          this.arr_text.push(1);
                                          if (this.arr_text[9]) {
                                            setTimeout(() => {
                                              this.arr_text.push(1);
                                              if (this.arr_text[10]) {
                                                setTimeout(() => {
                                                  this.isShowBtn = true;
                                                }, 2000);
                                              }
                                            }, 2000);
                                          }
                                        }, 1000);
                                      }
                                    }, 2000);
                                  }
                                }, 1000);
                              }
                            }, 2000);
                          }
                        }, 1000);
                      }
                    }, 2000);
                  }
                }, 1000);
              }
            }, 2000);
          }
        }, 1000);
      }
    }, 2000);
  },
};
</script>
