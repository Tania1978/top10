import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import { login } from "../actions/usersActions";
import { createTop10OfDay } from "../actions/top10Actions";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./Forms.css";
import history from "../history";

class LoginForm extends React.Component {
  state = { passwordShown: false };

  togglePassword = () => {
    this.setState({ passwordShown: this.state.passwordShown ? false : true });
  };

  showErrors = (meta) => {
    if (meta.touched && meta.error) {
      return <div>{meta.error}</div>;
    }
    return null;
  };

  renderInput = (props) => {
    return (
      <>
        <Form.Label>{props.label}</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            {...props.input}
            type={props.type}
            placeholder={props.placeholder}
          />
          {props.icon ? (
            <InputGroup.Append>
              <InputGroup.Text>
                <i className={props.icon} onClick={this.togglePassword}></i>
              </InputGroup.Text>
            </InputGroup.Append>
          ) : null}
        </InputGroup>
        <Form.Control.Feedback
          type="invalid"
          style={{ display: "block", color: "rgb(247, 10, 120)" }}
        >
          {this.showErrors(props.meta)}
        </Form.Control.Feedback>
      </>
    );
  };

  onSubmit = (formValues) => {
    this.props.login(formValues);
    setTimeout(() => {
      this.props.createTop10OfDay(this.props.loggedInUser.id);
      if (this.props.loggedInUser.isSignedIn) {
        toast.warning(`Welcome ${this.props.loggedInUser.username}!`);
      }
      if (this.props.error !== null && !this.props.loggedInUser.isSignedIn) {
        console.log(this.props.error);
        toast.error("Incorrect username or Password");
      }
    }, 1000);
    setTimeout(() => history.push("/"), 5000);
  };

  render() {
    return (
      <div className="container login">
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            label="Email address"
            name="email"
            type="email"
            placeholder="email"
            component={this.renderInput}
          />

          <Field
            name="password"
            label="Password"
            type={this.state.passwordShown ? "text" : "password"}
            placeholder="Password"
            component={this.renderInput}
            icon="bi bi-eye"
          />

          <Button variant="outline-warning" type="submit">
            Sign me In
          </Button>
          <div className="registerBtn">
            <Link to="/signup">
              <Button variant="outline-danger">
                Don't have an account? Register to Vote!
              </Button>
            </Link>
          </div>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.email || !formValues.password) {
    errors.email = "Please enter email.";
    errors.password = "Please enter password.";
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = "Invalid email address";
  }
  console.log(errors);
  return errors;
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    error: state.error,
  };
};

const wrappedForm = reduxForm({
  form: "Login",
  validate,
})(LoginForm);

export default connect(mapStateToProps, { login, createTop10OfDay })(
  wrappedForm
);
