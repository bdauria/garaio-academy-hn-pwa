import './patchPreact';

import path from 'path';
import Express from 'express';
import App from './app';
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
import { ServerStyleSheet } from 'styled-components';

const app = Express();
const port = 3000;

app.use('/dist', Express.static('dist'));

app.use(handleRender);

function handleRender(req, res) {
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

  const styledComponentsSheet = new ServerStyleSheet();

  const html = render(
    styledComponentsSheet.collectStyles(
      <JssProvider registry={materialSheets} jss={jss}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <StaticRouter context={{}}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>
    )
  );

  const css = materialSheets
    .toString()
    .concat(styledComponentsSheet.getStyleTags());

  res.send(renderFullPage(html, css));
}

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"></meta>
        <title>GARAIO HN</title>
      </head>
      <body>
        ${html}
        <style id="jss-server-side">${css}</style>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);
