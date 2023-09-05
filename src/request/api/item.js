import service from "..";
//获取歌单数据
export function getMusicList() {
  return service({
    method: "GET",
    url: `/personalized`,
  });
}
export function getMusicItem(data) {
  return service({
    method: "GET",
    url: `/playlist/detail?id=${data}`,
  });
}

// 获取歌词/lyric?id=33894312
export function getMusicLyric(data) {
  return service({
    method: "GET",
    url: `/lyric?id=${data}`,
  });
}
// 搜索/search?keywords= 海阔天空
export function getMusicSearch(data) {
  return service({
    method: "GET",
    url: `/search?keywords=${data}`,
  });
}
//登录/login?email=xxx@163.com&password=yyy
export function getLogin(data) {
  return service({
    method: "GET",
    url: `/login?email=${data.phone}@163.com&password=${data.password}`,
  });
}

// 用户信息/user/detail?uid=32953014
export function getUser(data) {
  return service({
    method: "GET",
    url: `/user/detail?uid=${data}`,
  });
}
