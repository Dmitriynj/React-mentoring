const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.static('dist'));

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack/webpack.dev');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
} else {
  const serverRenderer = require('../build/serverRenderer');

  let indexHTML;
  try {
    const indexHTMLPath = path.resolve(__dirname, '../dist/index.html');
    indexHTML = fs.readFileSync(indexHTMLPath, {
      encoding: 'utf8',
    });
  } catch (e) {
    console.log(e);
  }
  console.log('SERVICE_URL', process.env.SERVICE_URL);

  app.use(serverRenderer(indexHTML));
}

module.exports = app;
