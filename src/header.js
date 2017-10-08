import { h, Component } from 'preact';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';

const StoryLink = styled.div`
  cursor: pointer;
  margin-left: 30px;
  height: 25px;
  border-bottom: ${props => (props.selected ? '2px solid white' : 0)};
`;

const LinkText = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const storyTypes = ['top', 'new', 'show', 'ask', 'job'];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedType: 'top' };
  }
  render() {
    return (
      <AppBar title="Title">
        <Toolbar>
          <Typography type="body1">GARAIO-HN</Typography>
          {storyTypes.map(type => (
            <Typography type="body2">
              <StoryLink selected={this.state.selectedType === type}>
                <LinkText
                  onClick={() => this.setState({ selectedType: type })}
                  to={`/stories/${type}`}
                >
                  {type}
                </LinkText>
              </StoryLink>
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Header);
