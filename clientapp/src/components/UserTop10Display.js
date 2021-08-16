import React from "react";
import { connect } from "react-redux";
import { getTop10s, fetchCurrentTop10OfUser } from "../actions/top10Actions";
import { getAllAppMovies } from "../actions/appMovies";
import TopMovieDisplay from "./TopMovieDisplay";

class UserTop10Display extends React.Component {
  state = { userMovies: [] };
  componentDidMount() {
    this.props.getAllAppMovies();
    this.props.getTop10s();
    this.props.fetchCurrentTop10OfUser(this.props.userId);
  }

  getMovieData = () => {
    const userMovies = [];
    if (Object.keys(this.props.currentTopListOfUser).length !== 0) {
      const userTop10 = this.props.currentTopListOfUser;
      const userTop10Titles = userTop10.movies;
      const allAppMovies = this.props.appMovies;
      for (var i = 0; i < allAppMovies.length; i++) {
        let title = allAppMovies[i].Title;
        for (var j = 0; j < userTop10Titles.length; j++) {
          if (title === userTop10Titles[j]) {
            userMovies.push(allAppMovies[i]);
          }
        }
      }
    }
    return userMovies;
  };

  render() {
    let renderedList = [];
    const userMovies = this.getMovieData();
    if (userMovies.length !== 0) {
      renderedList = userMovies.map((movie, index) => {
        return (
          <div className="topMovieDisplayDiv" key={index}>
            <TopMovieDisplay position={index + 1} movie={movie} />
          </div>
        );
      });
    }

    return (
      <div>
        {this.props.currentTopListOfUser.movies.length !== 0 ? (
          <>
            <h2 style={{ color: "red", textAlign: "center" }}>
              Your Top Movies List!
            </h2>
            <div>{renderedList}</div>
          </>
        ) : (
          <h3 style={{ color: "red", textAlign: "center" }}>
            You havent voted any Movies yet.
          </h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: ownProps.match.params.id,
    appMovies: state.movies,
    allTop10s: state.allUserTop10,
    currentTopListOfUser: state.currentTopListOfUser,
  };
};

export default connect(mapStateToProps, {
  getAllAppMovies,
  getTop10s,
  fetchCurrentTop10OfUser,
})(UserTop10Display);
