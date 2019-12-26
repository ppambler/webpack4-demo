const webpack = require('webpack')
const path = require('path')
module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9001,
    contentBase: [
      path.join(__dirname, "src")
    ]
    ,
    hot: true,
    inline: true,
    overlay:true,
    hotOnly: true,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/([ -~]+)/,
          to: function (context) {
            return "./" + context.match[1] + ".html";
          }
        }
      ]
    },
    proxy: {
      "/smartSpec": {
        target: "https://mooc.study.163.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/smartSpec/qd": "/smartSpec/detail/1202816603.htm"
        },
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}