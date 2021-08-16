import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Vote = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const link = () => {
    if (loggedInUser.token === null) {
      return "/login";
    } else {
      return "/search";
    }
  };

  return (
    <div>
      <Link to={link}>
        <Button className="signInBtn btn" variant="outline-danger">
          Vote!
        </Button>
      </Link>
    </div>
  );
};

export default Vote;
