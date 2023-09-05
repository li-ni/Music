<template>
  <div class="top-D">
    <!-- 背景 -->
    <div class="d-img">
      <img :src="playlist.coverImgUrl" class="bg-img" />
    </div>
    <!-- 详情歌单上部分的图标 -->
    <div class="jianto">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui2"></use>
      </svg>
    </div>
    <span class="top-s">歌&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp单</span>
  </div>
  <!-- 中间部分 -->
  <div class="middle">
    <!-- 歌单照片 -->
    <div class="m-left">
      <img :src="playlist.coverImgUrl" />
    </div>
    <div class="m-right">
      <Vue3Marquee v-if="!this.$store.state.detailShow">
        <p>{{ playlist.name }}</p>
      </Vue3Marquee>
      <!-- 作者头像照片 -->
      <img :src="playlist.creator.avatarUrl" />
      <div class="ar_name">{{ playlist.creator.nickname }}</div>
      <!-- 跳转到详情 -->
      <!-- 歌单描述 -->
      <div class="text">{{ playlist.description }}</div>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
export default {
  setup(props) {
    console.log(props);
    // 通过props传值，判断如果数据拿取不到，就获取sessionStorage中的
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
  },
  // 跑马灯
  components: {
    Vue3Marquee,
  },
  // 子组件接收父组件传过来的值
  props: ["playlist"],
};
</script>
<style lang="less" scoped>
.top-D {
  display: flex;
  justify-content: space-between;
}
.top-s {
  color: white;
  width: 160px;
  height: 50px;
  right: 200px;
  position: relative;
  right: 300px;
  font-size: 40px;
}
.icon {
  // 填充颜色
  fill: white;
}
.bg-img {
  position: absolute;
  width: 100%;
  height: auto;
  z-index: -1;
  // 背景虚化
  filter: blur(30px) brightness(70%);
}
.middle {
  display: flex;
  justify-content: space-between;
}
.m-right {
  margin-top: 40px;
  margin-left: 20px;
}
.m-left img {
  width: 300px;
  height: 300px;
  margin-top: 40px;
  margin-left: 10px;
  border-radius: 25px;
}

.jianto {
  position: absolute;
}
.ar_name {
  font-size: 5px;
  color: white;
  margin-left: 90px;
  margin-top: -60px;
}
.m-right img {
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin-top: 20px;
}
.m-right p {
  font-size: 32px;
  color: white;
  width: 100%;
  margin-top: 20px;
  height: 60px;
}
.text {
  width: 400px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 25px;
  color: white;
  margin-top: 60px;

  overflow: scroll;
}
</style>
