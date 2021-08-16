import React from "react";
import Search from "./Search";
import Welcome from "./Welcome";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Search />
        <Welcome />
      </div>
    );
  }
}

export default Home;
