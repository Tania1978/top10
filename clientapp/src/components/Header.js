import React from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { connect } from "react-redux";
import { logOut } from "../actions/usersActions";
import history from "../history";

class Header extends React.Component {
  logOut = () => {
    this.props.logOut();
    localStorage.clear();
    setTimeout(() => history.push("/"), 2000);
  };
  render() {
    return (
      <Navbar className="navbar nav-link" expand="lg">
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navs">
              <Nav.Link
                as={NavLink}
                exact
                to="/"
                className="nav-link"
                activeStyle={{ color: "rgb(245, 222, 20)" }}
              >
                Home
              </Nav.Link>

              {this.props.loggedInUser.isSignedIn ? (
                <Nav.Link className="nav-link">
                  <button className="logout" onClick={this.logOut}>
                    Log Out
                  </button>
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={NavLink}
                  to="/Login"
                  className="nav-link"
                  activeStyle={{ color: "rgb(245, 222, 20)" }}
                >
                  SignIn
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, { logOut })(Header);
