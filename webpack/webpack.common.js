const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js', // Bundle with our code
    vendor: ['react', 'react-dom'], // Vendor libraries we want make in separate bundles
  },
  output: {
    filename: '[name].[fullhash].js', // [name] - name of the entry (bundle),
    // [checksum] or [hash] - to cache different bundles
    // from update when developing (doing changes in the files)
    path: path.resolve(__dirname, '../dist'),
    // where you uploaded your bundled files. (Relative to server root)
    // needs for react-router-dom
    publicPath: '/',
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
};
