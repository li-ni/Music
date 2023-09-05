<template>
  <div class="box">
    <div class="topNav">
      <!-- 登录 -->
      <div class="login" @click="$router.push('/User')" v-if="!isrecommend">
        登录
      </div>
      <!-- 登录后的图像 -->
      <div v-if="isrecommend">
        <img
          :src="userMsg.avatarUrl"
          class="ac_img"
          @click="$router.push('/User')"
        />
        <div class="ac_name">Hi,{{ userMsg.nickname }}</div>
        <p class="greet">{{ greeting }}</p>
      </div>
      <!-- 搜索 -->
      <div class="search" @click="$router.push('/search')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuoxiao"></use>
        </svg>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
import { getUser } from "@/request/api/item";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userMsg: {},
      greeting: "",
    };
  },
  computed: { ...mapState(["isrecommend"]) },
  // 获取用户信息
  async mounted() {
    let res = await getUser(this.$store.state.userId);
    this.userMsg = res.data.profile;
    console.log(this.userMsg);
    // 调用问候的方法
    this.setGreeting();
  },
  methods: {
    setGreeting() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour < 12) {
        this.greeting = "上 午 好";
      } else if (currentHour < 18) {
        this.greeting = "下 午 好";
      } else {
        this.greeting = "晚 上 好";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  position: absolute;
  top: 300px;
  width: 100%;
  // border: 1px black solid;
  height: 200px;
}
.topNav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  width: 30px;
  height: 30px;
}
.login {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: #bebebe;
  color: white;
  text-align: center;
  line-height: 150px;
  margin-top: 175px;
  margin-left: 35px;
  font-size: 40px;
  font-weight: 600;
}
.ac_img {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  left: 50px;
  top: 50px;
}
.ac_name {
  position: absolute;
  bottom: 100px;
  left: 230px;
  font-size: 25px;
  color: #403c3c;
}
.greet {
  position: absolute;
  left: 230px;
  top: 110px;
  font-size: 40px;
  font-weight: 500;
  color: #403c3c;
}
.search {
  position: absolute;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  text-align: center;
  line-height: 120px;
  top: 90px;
  right: 80px;
  line-height: 115px;
}
.icon {
  width: 50px;
  height: 50px;
}
</style>
