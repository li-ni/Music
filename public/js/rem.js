function remSize() {
  // 获取设备的宽度
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  // 这是html的
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
  // 设置字体大小 350/7.5 * 0.3
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}
remSize();
// DOM事件，当浏览器窗口大小变化时，自动会调用这个函数
window.onresize = function () {
  remSize();
};
