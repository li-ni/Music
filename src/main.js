import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import getVant from "./plugins";
import Vue3Marquee from "vue3-marquee";
import axios from "axios";
// 导入js文件 根据窗口调整html-font-siza大小
import "amfe-flexible";
const app = createApp(App);
getVant(app);
app.use(store);
app.use(router);
app.use(Vue3Marquee);
//vue的main.js
app.mount("#app");
