const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { rules } = require('./common/rules');

module.exports = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',
  watch: true,

  // Tell webpack the root file of our
  // server application
  entry: './src/serverRenderer.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'serverRenderer.js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },

  devtool: 'source-map',
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // importLoaders: 2,
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
};
