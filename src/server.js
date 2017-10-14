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
// const port = 3000;

// app.use(compression());
// app.use('/dist', Express.static('dist'));
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
        <title>GARAIO HN</title>
      </head>
      <body>
        ${html}
        <style id="jss-server-side">${css}</style>
        <script src="/init.bundle.js"></script>
        <script src="/1.bundle.js"></script>
        <script src="/0.bundle.js"></script>
        <script src="/2.bundle.js"></script>
        <script src="/11.bundle.js"></script>
        <script src="/7.bundle.js"></script>
        <script src="/6.bundle.js"></script>
        <script src="/3.bundle.js"></script>
        <script src="/10.bundle.js"></script>
        <script src="/9.bundle.js"></script>
        <script src="/8.bundle.js"></script>
        <script src="/5.bundle.js"></script>
        <script src="/14.bundle.js"></script>
        <script src="/12.bundle.js"></script>
        <script src="/13.bundle.js"></script>
        <script src="/4.bundle.js"></script>
      </body>
    </html>
    `;
}

// app.listen(port);
