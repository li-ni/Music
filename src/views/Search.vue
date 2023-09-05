<template>
  <div class="big_box">
    <div class="big_top">
      <div class="top">
        <!-- 返回图标 -->
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fanhui2"></use>
        </svg>
        <!-- 搜索框 -->
        <div class="d_search">
          <svg class="icon_search" aria-hidden="true" @click="enterKey">
            <use xlink:href="#icon-sousuoxiao"></use>
          </svg>
          <input
            v-model="value"
            placeholder="陈奕迅"
            @keydown.enter="enterKey"
            shape="round"
          />
        </div>
        <div></div>
        <!-- 文字 -->
      </div>
      <div class="moddle">
        <div class="h_search">历史搜索</div>
        <!-- 删除图标 -->
        <div class="delete">
          <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
          </svg>
        </div>
      </div>
      <!-- 历史搜索 -->
      <div
        v-for="item in keyWordList"
        :key="item"
        class="keyWord"
        @click="searchHistory(item)"
      >
        {{ item }}
      </div>
    </div>

    <!-- 渲染searchList: []内容 -->
    <div class="box">
      <!-- 一行歌曲内容 -->
      <div
        v-for="(item, i) in searchList"
        :key="i"
        class="every"
        @click="updataindex(item)"
        :class="{ active: i % 2 == 0 }"
      >
        <!-- 数量 -->
        <div class="number">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kaishi"></use>
          </svg>
        </div>

        <!-- 歌曲名称 -->
        <div class="name">{{ item.name }}</div>

        <!-- 作者姓名 -->
        <span class="a-name">
          <span v-for="count in item.artists" style="margin-left: 10px">{{
            count.name
          }}</span>
        </span>
        <!-- 虚线 -->
      </div>
    </div>
  </div>
</template>
<script>
import { getMusicSearch } from "@/request/api/item";
export default {
  data() {
    // 搜索历史
    return { value: "", keyWordList: [], searchList: [] };
  },
  mounted() {
    // 把data里面的keyWordList重新赋值了，那么在调用的时候就是调用存储在localStorage里面的keyWordList
    //  为什么不在methods里面给keyWordList重新赋值呢，因为重新刷新页面的话，keyWordList最开始是空值。
    // 只有调用了enterKey这个方法，keyWordList才能被赋值，所以要在mounted里面进行赋值，这样在页面刷新后
    // 会马上调用mounted，这样keyWordList就会有之前的内容，就会被渲染在页面上。

    // 这里要判断一下，因为remove了，那"keyWordList"就为空了，就不能unshift
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList"))
      ? JSON.parse(localStorage.getItem("keyWordList"))
      : [];
  },
  methods: {
    enterKey: async function () {
      // 只有在搜索框输入内容才处理
      if (this.value != "") {
        // 在数组最前面添加数据，这样就是最新的搜索情况
        this.keyWordList.unshift(this.value);
        // 去重之后再添加到localStorage里面
        this.keyWordList = [...new Set(this.keyWordList)];
        // 固定长度
        if (this.keyWordList.length > 6) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1);
        }
        localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        let res = await getMusicSearch(this.value);
        this.searchList = res.data.result.songs;
        console.log(this.searchList);
        this.value = "";
      }
    },
    // 点击删除图标
    delHistory: function () {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    // 点击历史搜索的内容
    searchHistory: async function (item) {
      let res = await getMusicSearch(item);
      this.searchList = res.data.result.songs;
      console.log("searchList");
      console.log(this.searchList);
    },
    // 点击搜索出来的歌曲进行播放
    // 实现原理:给state.playMusic后面push一个播放列表
    // 首先写一个方法去添加下标
    updataindex: function (item) {
      // 因为playMusicIndex改变了,那么下面调用到的属性也会改变,这里的数据和playMusic[playMusicIndax]下面的数据有点不一样,如果不改的话,就会报错
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayMusic", item);
      // push到playMusic数组里面,那下标就是最后一个了
      this.$store.commit(
        "updateplayMusicIndex",
        this.$store.state.playMusic.length - 1
      );
    },
  },
};
</script>
<style lang="less" scoped>
.big_box {
  background-color: #f3f3f3;
}
.big_top {
  background-color: #f3f3f3;
  width: 100%;
  height: 400px;
}
.box {
  width: 100%;
  height: auto;
  margin-top: 50px;
}
.top {
  display: flex;
  justify-content: space-between;
}

.d_search {
  margin-top: 30px;
  font-size: 20px;
  width: 500px;
  height: 50px;
  border-bottom: 3px black solid;
}
.icon_search {
  width: 25px;
  height: 25px;
  margin-right: 30px;
}
.h_search {
  font-size: 30px;
  margin-left: 50px;
  margin-top: 50px;
}
.delete {
  margin-right: 50px;
  margin-top: 50px;
}
.d_search input {
  border: 0px;
  margin-bottom: 2px;
}
input {
  background-color: #f3f3f3;
}
.keyWord {
  font-size: 20px;
  width: 160px;
  height: 70px;
  background-color: #ababb0;
  margin-left: 30px;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  line-height: 70px;
  color: white;
  margin-top: 50px;
}
.moddle {
  display: flex;
  justify-content: space-between;
  height: 70px;
}
// 渲染serachList
.every {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  height: 100px;
  line-height: 100px;
}

.name {
  font-size: 30px;
  font-weight: 600;
  text-align: left;
  width: 370px;
  overflow-x: auto;
  margin-left: 70px;
}
.a-name {
  font-size: 25px;
  text-align: left;
  width: 260px;
  overflow-x: auto;
}
.number {
  font-size: 30px;
  width: 10px;
  height: 10px;
  font-weight: 600;
  margin-top: 5px;
  line-height: 10px;
}
.icon {
  width: 40px;
  height: 40px;
  margin-top: 20px;
  margin-left: 20px;
}
.top {
  height: 90px;
  width: 100%;
  // border: 1px black solid;
  display: flex;
  justify-content: space-between;
}
</style>
