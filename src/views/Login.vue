<template>
  <div class="bgimg">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-fanhui2"></use>
    </svg>
    <div class="text">
      <div class="box_icon">
        <svg class="b_icon" aria-hidden="true">
          <use xlink:href="#icon-denglu"></use>
        </svg>
      </div>
    </div>
    <!-- 面板 -->
    <div class="box">
      <div class="icon_1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yonghuming"></use>
        </svg>
        <input type="text" v-model="phone" />
      </div>
      <div class="icon_2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-password"></use>
        </svg>
        <input type="password" v-model="password" />
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <button type="submit" @click="Login">登录</button>
      </div>
    </div>
    <van-notice-bar
      left-icon="volume-o"
      text="登录的账号是需要在网易云邮箱注册过的，
      并且绑定了网易云的，为了方便使用，请输入下面提供的账号和密码。"
    />
    <div style="margin-top: 10px"></div>
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="账号1：18874405762
      密码：lini123456A
      "
    />
    <div style="margin-top: 10px"></div>
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="
      账号2：13574408327
       密码：lini123456A
      "
    />
  </div>
</template>
<script>
import "animate.css";
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["updateIsrecommend"]),
    Login: function () {
      axios.defaults.withCredentials = true; //允许跨域携带cookie信息
      axios
        .get(
          `http://1347440.gnway.cc:80/login?email=${this.phone}@163.com&password=${this.password}`
        )
        .then((res) => {
          console.log(res);
          // 登录成功之后会返回200
          if (res.data.code == 200) {
            // 获取用户id
            this.$store.state.userId = res.data.account.id;
            this.$store.commit("updateIsLogin", true);
            this.$router.push("/user");
            this.$store.state.isFooterMusic = true;
            // 登录成功后就展示isrecommend
            this.updateIsrecommend();
          } else {
            alert("输入有误，请重新输入！");
            (this.password = ""), (this.phone = "");
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.bgimg {
  position: absolute;
  width: 100%;
  height: 100%;
  //icon图标在上面
  z-index: -1;
  background-color: #f3f3f3;
}
.box {
  position: absolute;
  width: 100%;
  height: 65%;
  top: 40%;
  border-radius: 170px 170px 0px 0px;
  background-color: white;
}
.box_icon {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: white;
  text-align: center;
  line-height: 220px;
  margin-left: 40px;
}
.b_icon {
  width: 100px;
  height: 100px;
}
.box div {
  margin-left: 15%;
}
.icon_1 {
  margin-top: 200px;
}
.icon_2 {
  margin-top: 50px;
}
.icon {
  margin-right: 20px;
  margin-left: 20px;
  width: 60px;
  height: 60px;
}
input {
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  width: 400px;
}
.text {
  width: 300px;
  height: 100px;
  // border: 1px black solid;
  position: absolute;
  text-align: center;
  left: 30%;
  top: 20%;
  color: black;
  font-size: 60px;
  font-weight: 600;
}
.icon {
  fill: black;
}
button {
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2);
  width: 200px;
  height: 70px;
  background-color: #f3f3f3;
  border: 0px;
  border-radius: 20px;
  position: absolute;
  left: 270px;
  margin-top: 10%;
  color: rgb(96, 95, 95);
  font-size: 30px;
}
</style>
