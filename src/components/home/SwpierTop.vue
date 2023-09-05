<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.imageUrl" class="i-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="line"></div>
</template>
<script>
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(() => {
      axios.get("http://1347440.gnway.cc:80/banner").then((res) => {
        state.images = res.data.banners;
      });
    });
    return { state };
  },
};
</script>
<style lang="less" scoped>
.line {
  border: 15px #f3f3f3 solid;
  width: 100%;
  // 和上面登录的距离
  margin-top: 30px;
}

.swipe {
  width: 100%;
  height: 200px;
}
/* 在图片上面定一个div */
.van-swipe-item {
  width: 100%;
  height: 4rem;
}
/* 把图片撑满就行 */
.i-img {
  width: 100%;
  height: 100%;
}
</style>
