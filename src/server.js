import './patchPreact';

import path from 'path';
import Express from 'express';
import Main from './main';
import { h } from 'preact';
import render from 'preact-render-to-string';
import { StaticRouter } from 'react-router-dom';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { green, red } from 'material-ui/colors';
import { Provider } from 'preact-redux';
import { createStore, combineReducers } from 'redux';
import { stories } from './stories-reducer';
import compression from 'compression';

export const app = Express();
app.use(handleRender);

function handleRender(req, res) {
  const context = {};
  const materialSheets = new SheetsRegistry();
  const jss = create(preset());
  jss.options.createGenerateClassName = createGenerateClassName;

  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'dark'
    }
  });

  const rootReducer = combineReducers({
    stories
  });
  const store = createStore(rootReducer);

  const html = render(
    <JssProvider registry={materialSheets} jss={jss}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Main />
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );

  const css = materialSheets.toString();
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.send(renderFullPage(html, css));
  }
}

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"></meta>
        <meta name="theme-color" content="#4CAF50">
        <link rel="manifest" href="/manifest.json">
        <title>GARAIO HN</title>
      </head>
      <body>
        ${html}
        <style id="jss-server-side">${css}</style>
        <script src="/init.js"></script>
        <script src="/0.js"></script>
        <script src="/1.js"></script>
        <script src="/2.js"></script>
        <script>
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
          }
        </script>
      </body>
    </html>
    `;
}
