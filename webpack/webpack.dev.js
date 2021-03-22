const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { plugins } = require('./common/plugins');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    writeToDisk: true,
    contentBase: './dist',
    hot: true,
    port: 3000,
    compress: true, // compress files to gzip to increase download speed
    disableHostCheck: false, // by default true, it is not recomended,
    // because it makes app vulnerable to DNS rebinding attacks
    open: true, // open the browser after server had been started
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-refresh/babel'].filter(Boolean),
          },
        },
      },
      {
        test: /\.(png|jpg)$/,
        use: [{ loader: 'url-loader' }],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: { sockIntegration: 'whm' },
    }),
  ].filter(Boolean),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
};
