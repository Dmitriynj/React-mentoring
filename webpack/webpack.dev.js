const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(), // for hot module replacement option of devServer
    new webpack.DefinePlugin({
      'process.env.SERVICE_URL': JSON.stringify('http://localhost:8080/api'),
    }),
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '../dist'),
      // path.join(__dirname, 'assets') // we can serve different folders if needed
    ],
    compress: true, // compress files to gzip to increase download speed
    port: 9001,
    disableHostCheck: false, // by default true, it is not recomended,
    // because it makes app vulnerable to DNS rebinding attacks
    headers: {
      'X-Custom-header': 'custom', // this requires apps with authentication
      // useful config obj
    },
    open: true, // open the browser after server had been started
    hot: true, // hot module replacement
    historyApiFallback: true, // needs for react-router-dom
  },
});
