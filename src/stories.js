import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { fetchStories } from './hacker-news-api';
import { loadStories } from './stories-reducer';
import Story from './story';
import { CircularProgress } from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  container: {
    marginTop: '75px'
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    fontSize: '17px'
  },
  progress: {
    marginTop: '20px'
  }
};

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  componentDidMount() {
    this.props.fetchStories(this.props.match.params.type, this.state.page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === this.props.location.pathname) {
      return;
    }
    this.setState({ page: 1 });
    this.props.fetchStories(nextProps.match.params.type, this.state.page);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
    this.props.fetchStories(this.props.match.params.type, this.state.page);
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
    this.props.fetchStories(this.props.match.params.type, this.state.page);
  }

  stories() {
    return Object.keys(this.props.stories).length === 0 ||
      !this.props.stories[this.state.page]
      ? []
      : this.props.stories[this.state.page];
  }

  content() {
    const { classes, stories } = this.props;
    if (this.stories().length === 0) {
      return <LinearProgress className={classes.progress} />;
    }
    return (
      <div>
        <ol>
          {this.stories().map(story => <Story story={story} id={story.id} />)}
        </ol>
        <div className={classes.pagination}>
          {this.state.page > 1 && (
            <button onClick={() => this.previousPage()}>{'<'} Prev</button>
          )}
          <button onClick={() => this.nextPage()} stroked>
            More {'>'}
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.container}>{this.content()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const typeStories = state.stories[ownProps.match.params.type];
  return {
    stories: typeStories.byPage
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchStories: (type, page) =>
    fetchStories(type, page).then(response => {
      dispatch(loadStories(type, page, response.data));
    })
});

const styled = withStyles(styles)(Stories);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
