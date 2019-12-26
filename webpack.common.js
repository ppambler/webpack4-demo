const webpack = require('webpack');
const path = require('path');
const dev = require('./webpack.dev.js');
const pro = require('./webpack.pro.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
module.exports = env => {
  var common = {
    entry: {
      app: path.join(__dirname, "/src/app.js"),
    },
    output: {
      path: path.join(__dirname, "/dist"),
      filename: '[name].bundle.js'
    },

    module: {
      rules: [
        getJsOptions(env),
        getCssOptions(env),
        getHtmlOptions(),
        getImgOptions(env)
      ]
    },
    plugins: [
      //提取额外css文件
      new MiniCssExtractPlugin({
        filename: '[name].min.css'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        minify: {
          collapseWhitespace: true
        },
        inject: true,
      }),
    ]
  };
  function getHtmlOptions() {
    return {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader'
      }
    }
  }
  function getJsOptions(env) {
    if(env === 'production') {
      return {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    } else {
      return {
        test: /\.js$/,
        use:
        {
          loader: 'babel-loader',
        }
      }
    }
  }
  function getCssOptions(env) {
    if (env === 'production') {
      return {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              }
            }
          },

        ]
      }
    } else {
      return {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              }
            }
          },

        ]
      }
    }
  }
  function getImgOptions(env) {
    if (env === 'production') {
      return {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:4].[ext]',
              outputPath: 'assets/img',
              publicPath: 'assets/img',
              limit: 5000
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-pngquant')({
                  speed: 2
                }),
                require('imagemin-mozjpeg')({
                  quality: 50
                }),
                require('imagemin-gifsicle')({
                  optimizationLevel: 3
                }),

              ]
            }
          }
        ],
      }
    } else {
      return {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:4].[ext]',
              outputPath: 'assets/img',
              publicPath: 'assets/img',
              limit: 5000
            }
          }
        ]
      }
    }

  }
  //返回配置对象
  return merge(env === 'production' ? pro : dev, common);
}