import { createStore } from "vuex";
import { getMusicLyric } from "@/request/api/item";
import getUser from "@/request/api/item";
export default createStore({
  state: {
    //这是个数组对象，想要播放音乐就要找到这个数组里面的对象的id
    playMusic: [
      {
        //播放列表
        al: {
          id: 159400773,
          name: "JJ的咖啡调调, Vol. 2",
          pic: 109951168466764240,
          picUrl:
            "http://p1.music.126.net/4x-65bnidSKyEMDBmGtn8g==/109951168466764238.jpg",
          pic_str: "109951168466764238",
        },
        id: 2019573476,
        name: "达尔文",
      },
    ],
    playMusicIndex: 0, //默认下标为0
    btnShow: true, //控制播放暂停
    detailShow: false, //控制音乐播放详情
    lyricList: {}, //歌词
    currentTime: 0, //当前时间
    musicAllTime: 0, //歌曲总时长
    homePage: false, //控制首页是否展示
    isLogin: false, //是否登录
    isFooterMusic: true, //FooterMusic组件是否显示
    isrecommend: false, //登陆后就展示recommend
    userId: 0, //用户id
  },
  getters: {},
  mutations: {
    updatebtnShow(state, value) {
      state.btnShow = value;
    },
    updatePlayMusic(state, value) {
      console.log(state.playMusic);
      state.playMusic = value;
    },
    updateplayMusicIndex(state, value) {
      state.playMusicIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLricList(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
    },
    updateMusicAllTime(state, value) {
      state.musicAllTime = value;
    },
    updateHomePage(state) {
      state.homePage = !state.homePage;
    },
    // 点击搜索之后,再点击出来的歌曲进行播放
    pushPlayMusic(state, value) {
      state.playMusic.push(value);
    },
    // 登录成功之后，就设为true，就不会跳转到login页面了
    updateIsLogin(state, value) {
      state.isLogin = value;
    },
    // 登录成功后就展示isrecommend
    updateIsrecommend(state) {
      state.isrecommend = !state.isrecommend;
    },
  },
  actions: {
    // 获取歌词
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value);
      console.log(res);
      context.commit("updateLricList", res.data.lrc);
    },
  },
  modules: {},
});
