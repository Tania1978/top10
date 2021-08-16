import React from "react";
import { Router } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import history from "../history";
import "./App.css";
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Body />
      </Router>
    );
  }
}

export default App;
