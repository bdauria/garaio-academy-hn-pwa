import { h, Component, render } from 'preact';
import Provider from 'preact-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { stories } from './stories-reducer';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Main from './main';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const rootReducer = combineReducers({
  stories
});
const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'dark'
  }
});

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.body,
  document.body.firstElementChild
);
