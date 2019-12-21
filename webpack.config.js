const extracss = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: {
    'xxx': './xxx.js',
    'yyy': './yyy.js'
  },
  output: {
    'filename': './[name].js',
    'publicPath': 'adadadaa'
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
        test: /\.css$/,
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
              require('postcss-cssnext')()
            ]
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
    })
  ]
}

