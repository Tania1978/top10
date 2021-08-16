import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { searchMovies } from "../actions/imbdMoviesActions";
import { fetchMovie } from "../actions/imbdMoviesActions";
import "./Movie.css";
import { Link } from "react-router-dom";

class Movie extends React.Component {
  render() {
    return this.props.movie ? (
      <div className="movie">
        <Card className="card" style={{ width: "18rem" }}>
          <Card.Img
            className="image"
            variant="top"
            src={this.props.movie.Poster}
          />
          <Card.Body className="cardBody">
            <Card.Title className="cardText">
              {this.props.movie.Title}
            </Card.Title>
            <div className="cardText">
              <Card.Text>Year : {this.props.movie.Year}</Card.Text>
            </div>
          </Card.Body>
          <div className="more">
            <Link
              className="button button-primary"
              to={`/movie/${this.props.movie.imdbID}`}
            >
              <Button variant="outline-warning">More</Button>
            </Link>
          </div>
        </Card>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: ownProps.movie,
  };
};

export default connect(mapStateToProps, { searchMovies, fetchMovie })(Movie);
