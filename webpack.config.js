const path = require("path");

module.exports = {
  entry: "./js/game.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      loader: "babel-loader",
      test: /\.js$/,
      exclude: /node_modules/,
    }, {
      test: /\.s?css$/,
      use: [
        "style-loader",
        "css-loader",
      ],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "url-loader",
        },
      ],
    },
    ],

  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
