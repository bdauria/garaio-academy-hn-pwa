import { h, Component, render } from 'preact';
import Header from './header';
import Stories from './stories';
import { Provider } from 'preact-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { stories } from './stories-reducer';
import { BrowserRouter } from 'react-router-dom';
import logger from 'redux-logger';
import App from './app';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';

import 'typeface-roboto';

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

export class Main extends Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    return <App />;
  }
}

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.body
);
