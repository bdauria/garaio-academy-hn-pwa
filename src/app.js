import { h, Component } from 'preact';
import { Route, Redirect, Switch } from 'react-router-dom';
import Stories from './stories';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ marginTop: '60px' }}>
          <Switch>
            <Route path="/stories/:type" component={Stories} />
            <Redirect from="/" to="stories/top" />
          </Switch>
        </div>
      </div>
    );
  }
}
