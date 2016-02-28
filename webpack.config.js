const path = require('path')
const webpack = require('webpack')
const process = require('process')
const minimize = process.argv.indexOf('--minimize') !== -1
const plugins  = minimize ? [ new webpack.optimize.UglifyJsPlugin() ] : []

module.exports = {
  entry: [ 'babel-polyfill', './src/main.js' ],
  output: {
    path: __dirname,
    filename: 'bundle.min.js'
  },
  plugins: plugins,
  resolve: { fallback: path.join(__dirname, 'node_modules') },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        loader: 'babel',
        test: /\.js$/,
        exclude: /node_modules/
      },
    ]
  }
};
