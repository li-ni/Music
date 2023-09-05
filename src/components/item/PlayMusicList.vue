<template>
  <!-- 渲染searchList: []内容 -->

  <!-- 一行歌曲内容 -->
  <div
    v-for="(item, i) in this.$store.state.playMusic"
    :key="i"
    class="every"
    :class="{ newEvery: i % 2 == 0 }"
  >
    <!-- 数量 -->
    <div class="number">
      <svg class="icon" aria-hidden="true" @click="playMusicList(i)">
        <use xlink:href="#icon-kaishi"></use>
      </svg>
    </div>
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
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    playMusicList(value) {
      this.updateplayMusicIndex(value);
    },
    ...mapMutations(["updateplayMusicIndex"]),
  },
};
</script>
<style lang="less" scoped>
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
</style>
