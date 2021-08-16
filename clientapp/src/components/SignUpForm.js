import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import { register, fetchUsers } from "../actions/usersActions";
import "./Forms.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "../history";

class SignUpForm extends React.Component {
  state = { passwordShown: false, emailExists: false };

  componentDidMount() {
    this.props.fetchUsers();
  }

  showErrors = (meta) => {
    if (meta.touched && meta.error) {
      return <div>{meta.error}</div>;
    }
    return null;
  };

  togglePassword = () => {
    this.setState({ passwordShown: this.state.passwordShown ? false : true });
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

  doesEmailExist = (formValues) => {
    const exists = this.props.users.some((ele) => {
      return ele.email === formValues.email;
    });
    return exists;
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    const exists = this.doesEmailExist(formValues);
    if (exists) {
      this.setState({ emailExists: true });
      toast.error(
        "Email Already Exists! Sign in if you already have an account."
      );
    } else {
      this.props.register(formValues);
      toast.success("Registration sucessfull!");
      setTimeout(() => history.push("/login"), 3000);
    }
  };

  renderHidden = (props) => {
    return <input type={props.type} value={props.value} />;
  };

  render() {
    return (
      <div className="container login">
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="username"
            type="text"
            component={this.renderInput}
            placeholder="Username"
            label="Username"
          />

          <Field
            name="email"
            type="email"
            component={this.renderInput}
            placeholder="Email"
            label="Email address"
          />

          <Field
            name="password"
            type={this.state.passwordShown ? "text" : "password"}
            component={this.renderInput}
            placeholder="password"
            label="Password"
            icon="bi bi-eye"
          />
          <Field
            name="password2"
            type={this.state.passwordShown ? "text" : "password"}
            component={this.renderInput}
            placeholder="Confirm Password"
            label="Password"
            icon="bi bi-eye"
          />

          <br />
          <Field
            name="isSignedIn"
            type="hidden"
            value={false}
            component={this.renderHidden}
          />
          <Button variant="secondary" type="submit">
            Create My Account!
          </Button>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.username) {
    errors.username = "Required";
  }
  if (!formValues.password) {
    errors.password = "Required";
  }

  if (!formValues.password2) {
    errors.password2 = "Required";
  }

  if (!formValues.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (formValues.username && formValues.username.length < 3) {
    errors.username = "Username must be over 2 characters";
  }
  if (formValues.password && formValues.password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  if (formValues.password2 && formValues.password !== formValues.password2) {
    errors.password2 = "Passwords don't match";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const wrappedForm = reduxForm({
  form: "SignUp",
  validate,
})(SignUpForm);

export default connect(mapStateToProps, { register, fetchUsers })(wrappedForm);
