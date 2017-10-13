import { h, Component } from 'preact';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  post: {
    borderBottom: '1px solid #ccc',
    marginRight: '40px',
    padding: '10px 0 10px 0px'
  },
  storyTitle: {
    color: '#484848',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '18px'
  },
  subInfo: {
    color: '#808080',
    marginLeft: '5px',
    marginRight: '5px'
  },
  storyInfo: {
    fontSize: '15px',
    padding: '0'
  }
};

const commentsString = count => {
  if (!count || count === 0) {
    return 'discuss';
  }
  return count > 1 ? 'comments' : 'comment';
};

class Story extends Component {
  content() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <a className={classes.storyTitle} href={this.props.story.url}>
            {this.props.story.title}
          </a>
          <a className={classes.subInfo}>{this.props.story.domain}</a>
        </div>
        <a className={classes.storyInfo}>
          <a className={classes.subInfo}>{this.props.story.points} points by</a>
          {this.props.story.user}
          <a className={classes.subInfo}>{this.props.story.time_ago}</a>
          {'| '}
          {commentsString(this.props.story.comments_count)}
        </a>{' '}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return <li className={classes.post}>{this.content()}</li>;
  }
}

export default withStyles(styles)(Story);
