import React from "react";
import MovieList from "./MovieList";
import { connect } from "react-redux";
import Search from "./Search";
import { Button } from "react-bootstrap";
import { searchMovies } from "../actions/imbdMoviesActions";
import history from "../history";

class SearchResults extends React.Component {
  componentDidMount() {
    this.props.searchMovies(
      this.props.match.params.keyword,
      parseInt(this.props.match.params.page)
    );
  }

  renderError = () => {
    if (this.props.error !== null) {
      return (
        <h3 style={{ color: "red", textAlign: "center" }}>
          {this.props.error}
        </h3>
      );
    }
  };

  renderMovieList = () => {
    if (this.props.movies.length > 0) {
      return (
        <div>
          <Search />
          <div>
            <MovieList movies={this.props.movies} />
          </div>
          <div className="moreBtnDiv">
            <Button onClick={this.showMore} variant="danger">
              Load more Movies <i className="bi bi-arrow-right-square"></i>
            </Button>
            <br />
            {this.props.loggedInUser.isSignedIn ? (
              <Button
                onClick={() =>
                  history.push(`/completeTop10/${this.props.loggedInUser.id}`)
                }
                variant="outline-warning"
              >
                I am Done Voting
              </Button>
            ) : null}
          </div>
        </div>
      );
    }
  };

  showMore = () => {
    const newPage = parseInt(this.props.page) + 1;
    this.props.searchMovies(this.props.keyword, newPage);
    setTimeout(
      () => history.push(`/results/${this.props.keyword}/${newPage}`),
      0
    );
  };

  render() {
    return (
      <>
        <div>{this.renderError()}</div>
        <div>{this.renderMovieList()}</div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    keyword: ownProps.match.params.keyword,
    page: ownProps.match.params.page,
    movies: state.imdbMovies,
    loggedInUser: state.loggedInUser,
    error: state.error,
  };
};
export default connect(mapStateToProps, { searchMovies })(SearchResults);
