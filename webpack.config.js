const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [ 'babel-polyfill', './src/main.js' ],
  output: {
    path: __dirname,
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
  ],
  resolve: { fallback: path.join(__dirname, 'node_modules') },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  devtool: 'source-map',
  module: {
    // preLoaders: [
    //   {
    //     test: /\/tinier\/lib\/.*\.js$/,
    //     loader: 'source-map-loader',
    //   }
    // ],
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
