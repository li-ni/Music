import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ItemMusic from "@/views/ItemMusic.vue";
import Search from "@/views/Search.vue";
import AboutView from "@/views/AboutView.vue";
import Login from "@/views/Login.vue";
import User from "@/views/User.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ItemMusic",
    name: "ItemMusic",
    component: ItemMusic,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/user",
    name: "user",
    component: User,
    // 每路守卫，如果还没登录就要跳转到登录页面
    beforeEnter: (to, from, next) => {
      // store.state.isLogin:false,还没有登录
      if (store.state.isLogin) {
        next();
      } else {
        next("/login");
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 全局守卫
router.beforeEach((to, from) => {
  // 如果是要去login登录页面，那底部组件footerMusic就不要显示
  if (to.path == "/login") {
    store.state.isFooterMusic = false;
  } else {
    store.state.isFooterMusic = true;
  }
});
export default router;
