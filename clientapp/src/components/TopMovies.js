import React from "react";
import { getTopMovies } from "../actions/appMovies";
import { connect } from "react-redux";
import TopMovieDisplay from "./TopMovieDisplay";
import Vote from "./Vote";
import "./TopMovies.css";

class TopMovies extends React.Component {
  componentDidMount() {
    this.props.getTopMovies();
  }
  render() {
    const renderedList = this.props.top10.map((movie, index) => {
      return (
        <div className="topMovieDisplayDiv" key={index}>
          <TopMovieDisplay position={index + 1} movie={movie} />
        </div>
      );
    });

    return (
      <div>
        <div>{renderedList}</div>
        <div className="signIn">
          <Vote />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    top10: state.top10AppMovies,
  };
};

export default connect(mapStateToProps, { getTopMovies })(TopMovies);
