import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const FetchMovies = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://swapi.dev/api/film/');
      if (!response.ok) {
        throw new Error("some thing went wrong....Retrying")
      }
      const data = await response.json();

      const translatedData = data.results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        }
      })
      setMovies(translatedData)
    }
    catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const intid = setInterval(() => {
      if (error)
        FetchMovies();
    }, 5000
    )
    return () => clearInterval(intid)
  }, [error])

  function cancelButtonHandler() {
    setError(null)
    setIsLoading(false)

  }
  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found</p>}
        {isLoading && <p>Loading....</p>}
        {error && <div><p>{error}</p>
          <button onClick={cancelButtonHandler}>cancel</button></div>}
      </section>
    </React.Fragment>
  );
}

export default App;
