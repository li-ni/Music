<template>
  <router-view />
  <FooterMusic
    class="footer"
    v-if="homePage"
    v-show="isFooterMusic"
  ></FooterMusic>
</template>
<script>
import FooterMusic from "./components/item/FooterMusic.vue";
import { mapState } from "vuex";
export default {
  components: {
    FooterMusic,
  },
  computed: {
    ...mapState(["homePage", "isFooterMusic"]),
  },
};
</script>
<style lang="less">
* {
  margin: 0px;
  padding: 0px;
  // 设内边距就不会撑开这个盒子
  box-sizing: border-box;
}
// 给图标设样式
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
a {
  color: black;
}
.footer {
  position: fixed;
  /*下面的属性根据实际需求更改*/
  bottom: 10px;
  width: 90%;
}
</style>
