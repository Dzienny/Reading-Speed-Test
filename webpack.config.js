var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    "readtest": './src/readtest/readtest.js',
    "background": "./src/background/background.js",
    "popup": "./src/popup/popup.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  },
  plugins: [
        new CopyWebpackPlugin([
          { from: './asset' },
          { from: 'manifest.json' },
          { from: 'popup.html'},
          { from: './_locales', to: './_locales'},
          { from: 'readtest.css'}
        ])
  ]
};