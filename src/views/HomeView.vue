<template>
  <div v-if="$store.state.homePage" class="home">
    <SwpierTop></SwpierTop>
    <TopNav />
    <MusicList></MusicList>
    <Recommend></Recommend>
  </div>
  <AboutView v-if="!$store.state.homePage"></AboutView>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/home/TopNav.vue";
import SwpierTop from "@/components/home/SwpierTop.vue";
import MusicList from "@/components/home/MusicList.vue";
import AboutView from "@/views/AboutView.vue";
import Recommend from "@/components/home/recommend.vue";
export default {
  data() {
    return {};
  },
  components: {
    TopNav,
    SwpierTop,
    MusicList,
    AboutView,
    Recommend,
  },
};
</script>
<style lang="less" scoped>
.home {
  background-color: #f3f3f3;
}
</style>
