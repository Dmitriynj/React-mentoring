import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { App } from './App';

const renderHTML = (indexHTML, app, css) => {
  return `
  <!doctype html>
  <html lang="en">
  
  <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="icon" href="/favicon.ico" sizes="192x192" />
      <link rel="manifest" href="/manifest.json" />
      
      <style>
      html,
      body,
      #root {
        height: 100%;
        width: 100%;
      }
  
      html,
      body {
        overflow: hidden;
        margin: 0;
      }
  
      #root {
        background-color: #424242;
        overflow: auto;
      }
    </style>
      <style id="jss-server-side">${css}</style>
      <title>React App</title>
  </head>
  
  <body><noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${app}</div>  
  </body>
  
  </html>
  `;
  // // populate `#app` element with `app`
  // return indexHTML
  //   .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  //   .replace('<style id="jss-server-side"></style>', `<style id="jss-server-side">${css}</style>`);
};

export default function serverRenderer(indexHTML) {
  return (req, res) => {
    const context = {};
    const root = <App location={req.url} Router={StaticRouter} context={context} />;

    const sheets = new ServerStyleSheets();
    const htmlString = renderToString(sheets.collect(root));

    // if (context.url) {
    //   res.writeHead(302, { location: context.url });
    //   res.end();
    //   return;
    // }

    // Grab the CSS from the sheets.
    const css = sheets.toString();
    res.send(renderHTML(indexHTML, htmlString, css));
  };
}
