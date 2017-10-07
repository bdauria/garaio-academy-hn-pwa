import { h, Component } from 'preact';
import styled from 'styled-components';
import { connect } from 'preact-redux';
import { fetchStories } from './hacker-news-api';
import { loadStories } from './stories-reducer';
import Story from './story';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

const Container = styled.div`padding: 8px 0;`;

const storiesPerPage = 30;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
  margin-top: 10px;
  font-size: 17px;
`;

const NavButton = styled(Button)`margin: 10px;`;

class Stories extends Component {
  componentDidMount() {
    this.props.fetchStories(this.props.match.params.type);
    this.setState({ page: 1 });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === this.props.location.pathname) {
      return;
    }
    this.props.fetchStories(nextProps.match.params.type);
    this.setState({ page: 1 });
  }

  pageSliceStart() {
    return (this.state.page - 1) * storiesPerPage;
  }

  pageSliceEnd() {
    return this.state.page * storiesPerPage;
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    return (
      <Container>
        <ol>
          {this.props.stories
            .slice(this.pageSliceStart(), this.pageSliceEnd())
            .map(id => <Story type={this.props.match.params.type} id={id} />)}
        </ol>
        <Pagination>
          {this.state.page > 1 && (
            <NavButton stroked onClick={() => this.previousPage()}>
              {'<'} Prev
            </NavButton>
          )}
          {this.pageSliceEnd() < this.props.stories.length &&
            this.props.stories.length > 0 && (
              <NavButton onClick={() => this.nextPage()} stroked>
                More {'>'}
              </NavButton>
            )}
        </Pagination>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const typeStories = state.stories[ownProps.match.params.type];
  return {
    stories: typeStories.ids
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchStories: type =>
    fetchStories().then(response => {
      dispatch(loadStories(type, response.data));
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
