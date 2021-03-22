import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { configureStore } from './store/store';
import { routes } from './routes';
import { App } from './App';

const renderHTML = (indexHTML, app, css, preloadedState) => {
  return indexHTML
    .replace(
      '<div id="root"></div>',
      `<div id="root">${app}</div>
        <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
    `
    )
    .replace('<style id="jss-server-side"></style>', `<style id="jss-server-side">${css}</style>`);
};

export default function serverRenderer(indexHTML) {
  return (req, res, next) => {
    // only for dev
    if (req.url.includes('json')) {
      next();
      return;
    }

    console.log('cur url', req.url);

    const store = configureStore();
    const currentRoute =
      routes.find((route) => {
        return matchPath(req.path, route);
      }) || {};

    let promise;
    if (currentRoute.loadData) {
      const { params } = matchPath(req.path, currentRoute);
      promise = currentRoute.loadData.call(null, {
        url: req.url,
        dispatch: store.dispatch,
        params,
      });
    } else {
      promise = Promise.resolve(null);
    }
    promise
      .then((data) => {
        const context = { data };

        const root = (
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </Provider>
        );
        const sheets = new ServerStyleSheets();
        const htmlString = renderToString(sheets.collect(root));

        // handle react-router-dom things
        if (context.status === 404) {
          res.status(404);
          return;
        }
        if (context.url) {
          console.log(`redirecting to the from ${req.url} to ${context.url}`);
          res.writeHead(302, { location: context.url });
          res.end();
          return;
        }

        // Grab the CSS from the sheets.
        const css = sheets.toString();
        // Grab the initial state from our Redux store
        const preloadedState = store.getState();

        res.send(renderHTML(indexHTML, htmlString, css, preloadedState));
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  };
}
