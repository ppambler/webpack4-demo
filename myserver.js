const express = require('express');
const webpackDevMid = require('webpack-dev-middleware');
const webpackhot = require('webpack-hot-middleware');
const webpack = require('webpack');
const commonfig = require("./webpack.common.js");
const devfig = require("./webpack.dev.js");
const merge = require('webpack-merge');
const devcommon = commonfig('development');
const config = merge(devcommon, devfig);
Object.keys(config.entry).forEach((name) => {
  config.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(config.entry[name]);
})

const app = express();
const complier = webpack(config);
app.use(webpackDevMid(complier, {}));
app.use(webpackhot(complier, {
  overlayStyles: true
}))
app.listen(2019);