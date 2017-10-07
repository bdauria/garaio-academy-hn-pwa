import { h, Component } from 'preact';
import Toolbar from 'preact-material-components/Toolbar';
import 'preact-material-components/Toolbar/style.css';
import Tabs from 'preact-material-components/Tabs';
import 'preact-material-components/Tabs/style.css';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return (
      <Toolbar className="toolbar" fixed>
        <Toolbar.Row>
          <Toolbar.Section>
            <Tabs scroller>
              <Tabs.Tab
                onClick={() => this.props.history.push('/stories/top')}
                active={true}
              >
                top
              </Tabs.Tab>
              <Tabs.Tab onClick={() => this.props.history.push('/stories/new')}>
                new
              </Tabs.Tab>
              <Tabs.Tab>show</Tabs.Tab>
              <Tabs.Tab>ask</Tabs.Tab>
              <Tabs.Tab>job</Tabs.Tab>
            </Tabs>
          </Toolbar.Section>
        </Toolbar.Row>
      </Toolbar>
    );
  }
}

export default withRouter(Header);
