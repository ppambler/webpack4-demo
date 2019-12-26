var webpack = require('webpack')

module.exports = {
  optimization: {
    minimize: false,
    splitChunks: {
      name: true,
      chunks: 'initial',
      automaticNameDelimiter: ".",
      minSize: 0,
      cacheGroups: {
        modulea: {
          test: /modulea/,
          priority: -10
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendor'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [

  ]
}