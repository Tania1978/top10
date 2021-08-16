import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form } from "react-bootstrap";
import { searchMovies } from "../actions/imbdMoviesActions";
import { connect } from "react-redux";
import "./Search.css";
import history from "../history";

class Search extends React.Component {
  renderInput = (formProps) => {
    return (
      <div style={{ width: "30%", margin: "auto" }}>
        <Form.Group>
          <Form.Label className="label">Search your Movie!</Form.Label>
          <Form.Control {...formProps.input} />
        </Form.Group>
      </div>
    );
  };

  onSubmit = (values) => {
    this.props.searchMovies(values.title, 1);
    history.push(`/results/${values.title}/1`);
  };

  render() {
    return (
      <div className="searchFormDiv">
        <Form
          className="search"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field name="title" component={this.renderInput} />
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    movies: state.imdbMovies,
  };
};
const wrappedForm = reduxForm({
  form: "Search",
})(Search);

export default connect(mapStateToProps, { searchMovies })(wrappedForm);
