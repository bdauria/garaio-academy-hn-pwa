import { h, Component } from 'preact';
import styled from 'styled-components';
import { connect } from 'preact-redux';
import { fetchStory } from './hacker-news-api';
import { loadStory } from './stories-reducer';
import moment from 'moment';
import Pluralize from 'pluralize';
import { CircularProgress } from 'material-ui/Progress';

const Post = styled.li`
  border-bottom: 1px solid #ccc;
  margin: 0px 30px 0 30px;
  padding: 10px 0 10px 5px;
`;

const StoryTitle = styled.a`
  color: #484848;
  text-decoration: none;
  cursor: pointer;
  font-size: 18px;
`;

const SubInfo = styled.a`
  color: #808080;
  margin-left: 5px;
  margin-right: 5px;
`;

const StoryInfo = styled.div`
  font-size: 15px;
  padding: 0;
`;

const domain = url => {
  if (url === undefined) {
    return '';
  }
  const domain = '(' + url.split('/')[2] + ')';
  return domain ? domain.replace('www.', '') : '';
};

const commentsString = descendants => {
  if (!descendants || descendants === 0) {
    return 'discuss';
  }
  return `${descendants} ${Pluralize('comment', descendants)}`;
};

class Story extends Component {
  componentDidMount() {
    this.props.fetchStory(this.props.type, this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id === this.props.id) {
      return;
    }
    this.props.fetchStory(nextProps.type, nextProps.id);
  }

  content() {
    if (!this.props.story.id) {
      return <CircularProgress />;
    }
    return (
      <div>
        <div>
          <StoryTitle href={this.props.story.url}>
            {this.props.story.title}
          </StoryTitle>
          <SubInfo>{domain(this.props.story.url)}</SubInfo>
        </div>
        <StoryInfo>
          <SubInfo>{this.props.story.score} points by</SubInfo>
          {this.props.story.by}
          <SubInfo>{moment.unix(this.props.story.time).fromNow()}</SubInfo>
          {'| '}
          {commentsString(this.props.story.descendants)}
        </StoryInfo>{' '}
      </div>
    );
  }

  render() {
    return <Post>{this.content()}</Post>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { story: { ...state.stories[ownProps.type].byId[ownProps.id] } };
};

const mapDispatchToProps = dispatch => ({
  fetchStory: (type, id) =>
    fetchStory(id).then(response => {
      return dispatch(loadStory(type, id, response.data));
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Story);
