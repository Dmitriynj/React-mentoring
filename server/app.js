const express = require('express');

const app = express();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack/webpack.dev');
  const compiler = webpack(config('webpack-dev-middleware'));

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
} else {
  const fs = require('fs');
  const path = require('path');
  const serverRenderer = require('../build/serverRenderer');

  let indexHTML;
  try {
    const indexHTMLPath = path.resolve(__dirname, '../dist/index.html');
    // // read `index.html` file
    // indexHTML = fs.readFileSync(indexHTMLPath, {
    //   encoding: 'utf8',
    // });
    // file removed
    fs.unlinkSync(indexHTMLPath);
  } catch (e) {
    console.error('ERROR: index.html.', e);
  }

  app.use(express.static('dist'));
  app.use(serverRenderer(indexHTML));
}

module.exports = app;
