import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMoviesHandler() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();

        const transferedData = responseData.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMoviesList(transferedData);
      } catch (ex) {
        setError(ex.message);
      }
      setIsLoading(false);
    }
    fetchMoviesHandler();
  }, []);
  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading Movies...</p>}
        {!isLoading && !error && <MoviesList movies={moviesList} />}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
