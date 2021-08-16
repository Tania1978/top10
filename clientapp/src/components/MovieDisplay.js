import React from "react";
import { getAllAppMovies, addVote } from "../actions/appMovies";
import { fetchMovie } from "../actions/imbdMoviesActions";
import { connect } from "react-redux";
import "./MovieDisplay.css";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { voteMovie } from "../actions/appMovies";
import {
  addVoteToTop10,
  getTop10s,
  fetchCurrentTop10OfUser,
} from "../actions/top10Actions";
import history from "../history";

class MovieDisplay extends React.Component {
  state = { movieVotes: 0, userTop10Votes: 0 };

  componentDidMount() {
    this.props.fetchMovie(this.props.id);
    this.props.getAllAppMovies();
    this.props.getTop10s();
  }

  runMoreRequests = () => {
    this.props.fetchCurrentTop10OfUser(this.props.loggedInUser.id);
  };

  doesMovieExistInAppMovies = () => {
    const exists = this.props.movies.some((ele) => {
      return ele.id === this.props.id;
    });
    return exists;
  };

  movieAlreadyVoted = (movies) => {
    const exists = movies.some((ele) => {
      return ele === this.props.movie.data.Title;
    });
    return exists;
  };

  getMovieById = (id) => {
    const movie = this.props.movies.find((movie) => movie.id === id);
    return movie;
  };

  getTodayDate = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return date;
  };

  userTop10VoteSucceeded = () => {
    const userTop10Votes = this.props.currentTopListOfUser.votes;
    if (userTop10Votes > this.state.userTop10Votes) {
      return true;
    }
    return false;
  };

  voteFirstTime = () => {
    this.props.voteMovie(this.props.movie);
    setTimeout(() => this.renderMessageFirstVoted(), 1000);
  };

  voteAgain = () => {
    this.setState({
      votes: this.getMovieById(this.props.id).Votes,
    });
    this.props.addVote(this.props.id);
    setTimeout(() => this.renderMessageVotedAgain(), 1000);
  };

  vote = () => {
    if (this.props.loggedInUser.isSignedIn) {
      this.runMoreRequests();
      setTimeout(() => {
        this.setState({
          userTop10Votes: this.props.currentTopListOfUser.votes,
        });
        const alreadyVoted = this.movieAlreadyVoted(
          this.props.currentTopListOfUser.movies
        );
        if (!alreadyVoted) {
          this.props.addVoteToTop10(
            this.props.loggedInUser.id,
            this.props.movie
          );
        } else {
          toast.error("You have already voted for that movie today!");
          setTimeout(() => history.goBack(), 5000);
        }
        const exists = this.doesMovieExistInAppMovies();
        if (exists) {
          this.voteAgain();
        } else {
          this.voteFirstTime();
        }
      }, 2000);
    } else {
      toast.error("Please sign In in order to Vote!");
      setTimeout(() => history.push("/login"), 5000);
    }
  };

  renderMessageFirstVoted = () => {
    const userTop10 = this.props.currentTopListOfUser;
    setTimeout(() => {
      const userTop10Votes = userTop10.votes;
      const userTop10VoteSucceeded = this.userTop10VoteSucceeded();
      const movieJustVoted = this.props.movies.find(
        (movie) => movie.Title === this.props.movie.data.Title
      );
      if (movieJustVoted !== undefined && userTop10VoteSucceeded) {
        this.renderVoteSuccess(
          this.props.loggedInUser.username,
          userTop10Votes
        );
      }
    }, 2000);
  };

  renderVoteSuccess = (username, votes) => {
    if (this.state.userTop10Votes < 9) {
      toast.success(
        `Thank you for your vote ${username}! You have a maximum of ${
          10 - votes
        } votes left for today to complete your top10!`
      );
      setTimeout(() => history.goBack(), 5000);
    }
    if (this.state.userTop10Votes === 9) {
      toast.success(
        `Your top10 is Complete ${username}! Thank you for voting!`
      );
      setTimeout(
        () => history.push(`/completeTop10/${this.props.loggedInUser.id}`),
        5000
      );
    }
  };

  renderMessageVotedAgain = () => {
    const userTop10Votes = this.props.currentTopListOfUser.votes;
    const userTop10VoteSucceeded = this.userTop10VoteSucceeded();
    const votedMovieVotes = this.props.movies.find(
      (movie) => movie.Title === this.props.movie.data.Title
    ).Votes;
    if (votedMovieVotes > this.state.movieVotes && userTop10VoteSucceeded) {
      this.renderVoteSuccess(this.props.loggedInUser.username, userTop10Votes);
    }
  };

  renderError = () => {
    if (this.props.movie.error !== null) {
      return (
        <div style={{ color: "white", textAlign: "center" }}>
          {this.props.movie.error}
        </div>
      );
    }
  };

  renderMovie = () => {
    if (this.props.movie.data) {
      return (
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              {this.props.movie.data.Poster === "N/A" ? (
                <div style={{ color: "white" }}>
                  Poster not available in Server
                </div>
              ) : (
                <img className="locandina" src={this.props.movie.data.Poster} />
              )}
              <div className="allText">
                <h1 className="txt">{this.props.movie.data.Title}</h1>
                <h5 className="txt">{`${this.props.movie.data.Year} , ${this.props.movie.data.Director}`}</h5>
                <h4 className="txt">{this.props.movie.data.Actors}</h4>
                <h6 className="txt">{`Writen by: ${this.props.movie.data.Writer}`}</h6>
                <p className=" txt  type">{this.props.movie.data.Genre}</p>
                {this.props.movie.Awards !== "N/A" ? (
                  <p className=" txt  type">{this.props.movie.data.Awards}</p>
                ) : null}

                <div className="movie_desc">
                  <p className=" txt text">{this.props.movie.data.Plot}</p>
                </div>

                <div>
                  <Button onClick={this.vote} variant="outline-danger">
                    Vote for it!
                  </Button>
                  <Button
                    onClick={() =>
                      history.push(
                        `/completeTop10/${this.props.loggedInUser.id}`
                      )
                    }
                    variant="outline-warning"
                  >
                    I am Done Voting
                  </Button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
          <div className="blur_back bright_back"></div>
        </div>
      );
    } else {
      return <div>...</div>;
    }
  };

  render() {
    return (
      <>
        <div>{this.renderError()}</div>
        <div>{this.renderMovie()}</div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.id,
    movie: state.selectedMovie,
    movies: state.movies,
    loggedInUser: state.loggedInUser,
    usersTop10s: state.allUserTop10,
    currentTopListOfUser: state.currentTopListOfUser,
  };
};

export default connect(mapStateToProps, {
  fetchMovie,
  voteMovie,
  getAllAppMovies,
  addVoteToTop10,
  getTop10s,
  fetchCurrentTop10OfUser,
  addVote,
})(MovieDisplay);
