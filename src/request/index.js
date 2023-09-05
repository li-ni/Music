import axios from "axios";
axios.defaults.withCredentials = true; //允许跨域携带cookie信息
let service = axios.create({
  baseURL: "http://1347440.gnway.cc:80",
  timeout: 55000,
});
export default service;
