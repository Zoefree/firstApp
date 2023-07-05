const { defineConfig } = require("@vue/cli-service");
// vue.config.js
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  //配置webpack自动按需引入element-plus，

  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // css: {
  //   sass: {
  //     additionalData: [`@import "src/assets/style/index.scss";`].join(""),
  //   },
  // },
  devServer: {
    proxy: {
      "/api": {
        //target 我们要连接的后端地址
        target: "http://localhost:3000",
        changeOrigin: true, //是否跨域
        pathRewrite: { "^/api": "/" },
      },
    },
  },
});
