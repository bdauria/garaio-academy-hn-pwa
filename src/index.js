import Header from './header';

import { h, render } from 'preact';
import Stories from './stories';
import { Provider } from 'preact-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { stories } from './stories-reducer';
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  stories
});
const store = createStore(rootReducer, applyMiddleware(logger));

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <div style={{ marginTop: '60px' }}>
          <Switch>
            <Route path="/stories/:type" component={Stories} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  document.body
);
