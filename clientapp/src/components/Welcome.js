import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Vote from "./Vote";
import logo from "../images/logo.png";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="back">
      <div className="title">
        <div className="logodiv">
          <img src={logo} className="logo" alt=" logo" />
        </div>
        <div className="seetop10">
          <Link to="/topMovies">
            <Button className="seetop10Btn btn" variant="outline-warning">
              Latest Top10!
            </Button>
          </Link>
        </div>

        <div className="signIn">
          <Vote />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
