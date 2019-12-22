const extracss = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path');

var SpritesmithPlugin = require('webpack-spritesmith');


module.exports = {
  mode: 'development',
  entry: {
    'xxx': './xxx.js',
    'yyy': './yyy.js'
  },
  output: {
    'filename': './[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        use:{
          loader: 'html-loader',
          options: {
            attrs: [
              'img:data-src',
              "video:src"
            ]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path]_[name]_[local]_[hash]'
            }
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')(),
              require('postcss-cssnext')(),
              // require('postcss-sprites')()
            ]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
            },
          }
        }
        ]
      },
      {
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
                  quality: 50 //1-100，1是压缩到最狠的
                }),
                require('imagemin-gifsicle')({
                  optimizationLevel: 3 //1、2、3，3是最狠的！ 
                }),

              ]
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      chunks: ['xxx']
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index2.html',
      chunks: ['yyy']
    }),
    new SpritesmithPlugin({
      src: {
        // 图片来源文件夹
        cwd: path.join(__dirname, './img'),
        // 处理什么图片
        glob: '*.*'
      },
      target: {
        // 打包到哪儿
        image: path.join(__dirname, 'dist/sprites/sprite.png'),
        css: path.join(__dirname, 'dist/sprites/sprite.css')
      },
      apiOptions: {
        cssImageRef: "./sprites/sprite.png"
      }
    })
  ]
}

