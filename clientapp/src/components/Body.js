import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import MovieDisplay from "./MovieDisplay";
import SearchResults from "./SearchResults";
import SignUpForm from "./SignUpForm";
import TopMovies from "./TopMovies";
import Search from "./Search";
import UserTop10Display from "./UserTop10Display";

export default function Body() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route path="/results/:keyword/:page" component={SearchResults} />
      <Route exact path="/movie/:id" component={MovieDisplay} />
      <Route exact path="/topMovies" component={TopMovies} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignUpForm} />
      <Route exact path="/completeTop10/:id" component={UserTop10Display} />
    </Switch>
  );
}
