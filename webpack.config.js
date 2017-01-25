module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    library: 'chromecast-discover',
    libraryTarget: 'umd',
    filename: 'index.js',
  },
  externals: [
    'debug',
    'mdns-js',
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
