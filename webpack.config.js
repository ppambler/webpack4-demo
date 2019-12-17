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
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            // options: {
            //   'insert': 'body'
            // }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [

  ]
}