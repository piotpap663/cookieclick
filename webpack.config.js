const path = require('path');

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/
        }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  }
};
