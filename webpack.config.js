var path = require('path'); // eslint-disable-line no-var
var nodeExternals = require('webpack-node-externals'); // eslint-disable-line no-var

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    library: 'chromecast-discover',
    libraryTarget: 'umd',
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
};
