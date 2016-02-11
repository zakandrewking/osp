const path = require('path')

module.exports = {
  entry: [ 'babel-polyfill', './src/main.js' ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: { fallback: path.join(__dirname, 'node_modules') },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\/tinier\/lib\/.*\.js$/,
        loader: 'source-map-loader',
      }
    ],
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
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.pdb$/,
        loader: 'raw-loader',
      }
    ]
  }
};
