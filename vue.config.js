const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
      "/api": {
        target: "http://1347440.gnway.cc:80", // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "http://1347440.gnway.cc:80", //需要rewrite重写成空字符串,
        },
      },
    },
  },
});
