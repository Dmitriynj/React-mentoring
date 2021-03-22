const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../public/index.html'),
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: '',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../../src/assets'),
          to: path.join(__dirname, '../../dist'),
        },
        {
          from: path.join(__dirname, '../../public'),
          to: path.join(__dirname, '../../dist'),
          globOptions: {
            dot: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.SERVICE_URL': JSON.stringify('http://localhost:4000'),
    }),
    new webpack.ProgressPlugin(),
  ],
};
