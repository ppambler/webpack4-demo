module.exports = {
  mode: 'development',
  entry: {
    'xxx': './xxx.js',
    'yyy': './yyy.js'
  },
  output: {
    'filename': './[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '10.15.3'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [

  ]
}