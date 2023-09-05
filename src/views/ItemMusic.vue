<!-- 一个大组件，包括上部分和下部分，并把参数传过去 -->
<template>
  <div>
    <itemMusicTop :playlist="state.playlist"></itemMusicTop>
    <itemMusicList
      :playMusic="state.playlist.tracks"
      :subscribedCount="state.playlist.subscribedCount"
      :length="state.count"
    ></itemMusicList>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItem } from "@/request/api/item";
import itemMusicTop from "@/components/item/itemMusicTop.vue";
import itemMusicList from "@/components/item/itemMusicList.vue";
export default {
  setup() {
    // 根据id获取对应api内容
    const state = reactive({
      playlist: {},
      count: 0,
    });
    // 获取歌单详情数据
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItem(id);
      state.playlist = res.data.playlist;
      // 歌曲数量
      state.count = res.data.playlist.tracks.length;
    });
    // 防止页面刷新丢失数据，将数据保存到sessionStorage
    //JSON.stringify(state)将js对象转换成json字符串
    sessionStorage.setItem("itemDate", JSON.stringify(state));
    sessionStorage.setItem("playCount", JSON.stringify(state.playlist.tracks));
    return { state };
  },
  components: {
    itemMusicTop,
    itemMusicList,
  },
};
</script>
