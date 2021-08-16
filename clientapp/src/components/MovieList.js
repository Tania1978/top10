import React from "react";
import Movie from "./Movie";
import { connect } from "react-redux";
import "./MovieList.css";
import { searchMovies } from "../actions/imbdMoviesActions";

class MovieList extends React.Component {
  render() {
    if (this.props.movies.length > 0) {
      const renderedList = this.props.movies.map((movie, index) => {
        return (
          <div key={index} className="item">
            <Movie movie={movie} />
          </div>
        );
      });

      return <div className="grid">{renderedList}</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    keyword: ownProps.keyword,
    page: ownProps.page,
    movies: ownProps.movies,
  };
};

export default connect(mapStateToProps, { searchMovies })(MovieList);
