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
                    browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
                  }
                }
              ]
            ],
            plugins: [
              ['@babel/transform-runtime']
            ]
          }
        }
      }
    ]
  },
  plugins: [

  ]
}