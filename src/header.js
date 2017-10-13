import { h, Component } from 'preact';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

import classNames from 'classnames';

const styles = {
  storyLink: {
    cursor: 'pointer',
    marginLeft: '20px',
    height: '25px',
    borderBottom: '2px solid transparent'
  },
  storyLinkSelected: {
    borderBottom: '2px solid white'
  },
  linkText: {
    textDecoration: 'none',
    color: '#fff'
  }
};

const storyTypes = ['news', 'newest', 'show', 'ask', 'jobs'];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedType: 'news' };
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar title="Title">
        <Toolbar>
          <Typography type="body1">GARAIO-HN</Typography>
          {storyTypes.map(type => (
            <Typography type="body2">
              <div
                selected={this.state.selectedType === type}
                className={classNames({
                  [classes.storyLink]: true,
                  [classes.storyLinkSelected]: this.state.selectedType === type
                })}
              >
                <Link
                  className={classes.linkText}
                  onClick={() => this.setState({ selectedType: type })}
                  to={`/stories/${type}`}
                >
                  {type}
                </Link>
              </div>
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
    );
  }
}

const styled = withStyles(styles)(Header);

export default withRouter(styled);
