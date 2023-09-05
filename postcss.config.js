module.exports = {
  plugins: {
    autoprefixer: {},
    // flexible配置
    "postcss-pxtorem": {
      rootValue: 75, // 设计稿宽度的1/10  设计稿750px-->75  640px-->64
      propList: ["*"], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    },
  },
};
