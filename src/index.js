import { h, Component, render } from 'preact';
import Header from './header';
import Stories from './stories';
import { Provider } from 'preact-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { stories } from './stories-reducer';
import { BrowserRouter } from 'react-router-dom';
import Main from './main';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';

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
