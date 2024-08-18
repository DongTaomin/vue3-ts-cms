const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

// module.exports = {
//   devServer: {
//     proxy: {
//       "^/api": {
//         target: "http://codercba.com:5000",

//         pathRewrite: {
//           "^/api": " ",
//         },
//         changeOrigin: true,
//       },
//     },
//   },
// };

// vue.config.js 解决控制台报警告
module.exports = {
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      });
      return definitions;
    });
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://codercba.com:5000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
