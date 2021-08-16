import axios from "axios";

export default axios.create({
  baseURL: "https://movie-database-imdb-alternative.p.rapidapi.com",

  headers: {
    "x-rapidapi-key": "ed45f75767mshfdddb27fe2b71a6p1453c4jsn9e40c13eb6e0",
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
  },
});
