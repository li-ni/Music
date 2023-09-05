<template>
  <div class="bg_color">
    <!-- 背景 -->
    <img :src="userMsg.backgroundUrl" class="bg_img" />
    <!-- 头部图标 -->
    <div class="top_icon">
      <svg class="icon" aria-hidden="true" @click="$router.push('/')">
        <use xlink:href="#icon-fanhui3"></use>
      </svg>
    </div>
    <!-- 头部卡片 -->
    <div class="card_1">
      <!-- 图像 -->
      <img :src="userMsg.avatarUrl" class="ac_img" />
      <div class="ac_name">{{ userMsg.nickname }}</div>
    </div>
    <!-- 卡片2 -->
    <div class="card_2">
      <div style="margin-left: 10px; margin-right: 10px">
        <h2>播放功能</h2>
        <h3>音乐播放:</h3>
        <div>
          点击所有页面底部的播放按钮、每日推荐、热门歌单里面的歌曲、搜索获得的歌曲、
          等等。
        </div>
        <h3 style="margin-top: 10px">实现原理:</h3>
        <div>
          在网易云api接口获取音乐id，以src赋值给audio,
          用ref绑定audio标签，去调用audio标签的play()方法和pause()方法实现播放和暂停功能。
        </div>
      </div>
    </div>
    <!-- 卡片3 -->
    <div class="card_3">
      <div style="margin-left: 10px; margin-right: 10px">
        <h2>切换歌曲功能</h2>
        <h3>手动切换:</h3>
        <div>点击页面底部的上一首或下一首，或搜索出来的歌曲，等等。</div>
        <h3 style="margin-top: 10px">实现原理:</h3>
        <div>
          改变歌曲的id就可以切换歌曲。例如在歌单里面随机点击一首歌曲，在歌单这个数组里面找到这个歌曲的下标，
          通过下标就能获取到这首歌曲的详细内容，再找到歌曲id就能播放这首歌曲了！
        </div>
        <h3 style="margin-top: 10px">亮点:</h3>
        <div>
          任意地方点击歌曲都会切换歌曲，并且把数据都渲染到页面底部播放组件上和歌词页面组件上，
          因为所用到的数据都是在store里面，实现了数据共享。
        </div>

        <h3 style="margin-top: 30px">自动切换:</h3>
        <div>一首歌曲播放完毕之后，自动播放列表里面的下一首歌曲。</div>
        <h3 style="margin-top: 10px">实现原理:</h3>
        <div>
          获取到一首歌曲的总时间和当前时间，如果两个值相等，下标加1。
          因为列表里面的歌曲都在一个数组里面，只要下标加1即可。
        </div>
      </div>
    </div>
    <!-- 卡片4 -->
    <div class="card_4">
      <div style="margin-left: 10px; margin-right: 10px">
        <h2>歌词展示功能</h2>
        <h3>歌词展示:</h3>
        <div>
          每首歌词都能按歌曲内容实时展示，到播放内容时，进行字体放大展示。
        </div>
        <h3 style="margin-top: 10px">实现原理:</h3>
        <div>
          通过网易云api接口获取到歌词内容，给歌词进行切割，写样式展示出来，
          同时添加动态class，如果到了正在播放的歌词，就要进行字体放大处理。
        </div>
        <h3 style="margin-top: 10px">亮点:</h3>
        <div>
          正在播放的歌词虽然是放大了，但是没有固定在中间位置，需要用户手动滑动歌词。
          可以通过监听当前播放时间，获取歌词的p标签的offsetTop属性，如果这个属性的值大于您想要的高度，
          就可以设置scrollTop值，这样正在播放的歌词就不会下滑，一直保持固定位置。
        </div>
      </div>
    </div>

    <!-- 卡片5 -->
    <div class="card_5">
      <div style="margin-left: 10px; margin-right: 10px">
        <h2>搜索功能</h2>
        <h3>搜索关键字:</h3>
        <div>
          可以搜索您喜欢的歌手或歌曲，等等。 搜索记录和搜索内容都展示出来。
        </div>
        <h3 style="margin-top: 10px">实现原理:</h3>
        <div>
          v-model实现数据双向绑定，把在input上输入的内容存储到localStorag，这样即使退出组件，
          再次进入组件时，记录都存在。
          调用网易云api的搜索接口，展示接口的返回内容。
        </div>
      </div>
    </div>
    <!-- 卡片 6-->
    <div class="card_6">
      <div style="margin-left: 10px; margin-right: 10px">
        <h2>登录功能</h2>
        <h3>用户登录:</h3>
        <div>
          在登录组件里面输入账号和密码进行登录，登录成功之后就能进入用户组件。
        </div>
        <h3 style="margin-top: 10px">实现原理:</h3>
        <div>
          在store里面定义store.state.isLogin:false。在用户组件的路由上进行每路守卫，
          如果isLogin为false，那么就要跳转到登录组件，进行登录，登录成功之后就定义isLogin为true。
          这样如果登录成功之后，想再次进入用户组件就不用再到登录组件进行登录了，可以直接跳转到用户组件。
        </div>
      </div>
    </div>

    <!-- 卡片 7-->
    <div class="card_7">
      <div style="margin-left: 10px; margin-right: 10px">
        <h2>项目问题</h2>
        <h3>接口数据加载不出:</h3>
        <div>项目部署之后，用外网访问时，所有接口数据都加载不出</div>
        <h3 style="margin-top: 10px">解决方法:</h3>
        <div>
          在引入阿里巴巴图标的时候，路径前缀是https开头，和后端接口产生冲突，后面把图标路径改为http就可以了。
        </div>
        <h3 style="margin-top: 30px">移动端适配失败:</h3>
        <div>
          在不同手机上用微信扫一扫时，有个手机展示的内容就出现了不适配情况
        </div>
        <h3 style="margin-top: 10px">解决方法:</h3>
        <div>
          因为该手机的微信开启了关环模式，所以项目在微信上不适配，其它手机都是正常的。
        </div>
      </div>
    </div>

    <div class="last">
      <h2>非常感谢您的阅读</h2>
      <svg class="icon_1" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-xihuan"></use>
      </svg>
      <svg class="icon_home" aria-hidden="true" @click="$router.push('/')">
        <use xlink:href="#icon-home-fill"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { getUser } from "@/request/api/item";
export default {
  data() {
    return {
      userMsg: {},
    };
  },
  // 获取用户信息
  async mounted() {
    console.log("user");
    let res = await getUser(this.$store.state.userId);
    this.userMsg = res.data.profile;
    console.log(this.userMsg);
  },
};
</script>
<style lang="less" scoped>
.bg_color {
  position: absolute;
  width: 100%;
  height: 287%;
  background-color: #f4f4f4;
  font-size: 22px;
}
.bg_img {
  position: absolute;
  width: 100%;
  height: 400px;
}
.ac_img {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  bottom: 170px;
  left: 250px;
}
.ac_name {
  position: absolute;
  bottom: 80px;
  left: 230px;
}
.top_icon {
  display: flex;
  justify-content: space-between;
}
.icon {
  margin-left: 30px;
  margin-top: 30px;
  z-index: 1;
}
.card_1 {
  background-color: #ffffff;
  width: 90%;
  height: 250px;
  left: 5%;
  position: absolute;
  top: 350px;
  border-radius: 20px;
  opacity: 0.9;
}
.card_2 {
  background-color: #ffffff;
  width: 90%;
  height: 360px;
  left: 5%;
  position: absolute;
  top: 650px;
  border-radius: 20px;
}
.card_2 h2 {
  line-height: 90px;
  text-align: center;
}
.card_3 {
  background-color: #ffffff;
  width: 90%;
  height: 700px;
  left: 5%;
  position: absolute;
  top: 1070px;
  border-radius: 20px;
}
.card_3 h2 {
  line-height: 90px;
  text-align: center;
}
.card_4 {
  background-color: #ffffff;
  width: 90%;
  height: 570px;
  left: 5%;
  position: absolute;
  top: 1840px;
  border-radius: 20px;
}
.card_4 h2 {
  line-height: 90px;
  text-align: center;
}
.card_5 {
  background-color: #ffffff;
  width: 90%;
  height: 360px;
  left: 5%;
  position: absolute;
  top: 2470px;
  border-radius: 20px;
}
.card_5 h2 {
  line-height: 90px;
  text-align: center;
}
.card_6 {
  background-color: #ffffff;
  width: 90%;
  height: 420px;
  left: 5%;
  position: absolute;
  top: 2890px;
  border-radius: 20px;
}
.card_6 h2 {
  line-height: 90px;
  text-align: center;
}
.card_7 {
  background-color: #ffffff;
  width: 90%;
  height: 556px;
  left: 5%;
  position: absolute;
  top: 3371px;
  border-radius: 20px;
}
.card_7 h2 {
  line-height: 90px;
  text-align: center;
}
.last {
  position: absolute;
  top: 4000px;
  left: 250px;
}
.icon_1 {
  position: absolute;
  left: 270px;
  bottom: 5px;
  width: 40px;
  height: 40px;
}
.icon_home {
  position: absolute;
  right: 320px;
  width: 60px;
  height: 60px;
  bottom: 0px;
}
</style>
