import {
  Swipe,
  SwipeItem,
  Button,
  Popup,
  Search,
  Grid,
  GridItem,
  NoticeBar,
  Dialog,
} from "vant";
// 放入数组中
let plugins = [
  Dialog,
  Swipe,
  SwipeItem,
  Button,
  Popup,
  Search,
  Grid,
  GridItem,
  NoticeBar,
];
// 需要把这个函数导出
// foreach()函数
// array.forEach(callbackFn(currentValue, index, arr), thisValue)
// 箭头函数
//forEach((element) => { /* … */ })
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
