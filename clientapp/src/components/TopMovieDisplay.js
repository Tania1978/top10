import React from "react";
import "./TopMovieDisplay.css";

class TopMovieDisplay extends React.Component {
  render() {
    return (
      <div className="display">
        <h3> {`${this.props.position} . ${this.props.movie.Title}`}</h3>
        <div className="cardImgDiv">
          <img className="cardImg" src={this.props.movie.Poster} alt="Poster" />
        </div>
        <div className="votes">
          <h6>{this.props.movie.Year}</h6>
          <h5>{`Total Votes: ${this.props.movie.Votes}`}</h5>
        </div>
      </div>
    );
  }
}

export default TopMovieDisplay;
