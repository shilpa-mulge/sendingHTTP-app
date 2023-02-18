import React, { useCallback, useEffect, useState } from 'react';
import FormUserInput from './components/FormInput';
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
      const response = await fetch('https://react-app-cd331-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error("some thing went wrong....Retrying")
      }
      const data = await response.json();

      const loadArr = [];
      for (const key in data) {
        loadArr.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].date
        })
      }

      console.log(loadArr)
      /*  const translatedData = data.results.map(movie => {
         return {
           id: movie.episode_id,
           title: movie.title,
           releaseDate: movie.release_date,
           openingText: movie.opening_crawl,
         }
       }) 
       setMovies(translatedData)
       */
      setMovies(loadArr)
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

  useEffect(() => {
    FetchMovies();
  }, [FetchMovies])

  function cancelButtonHandler() {
    setError(null)
    setIsLoading(false)

  }
  return (
    <React.Fragment>
      <section> <FormUserInput /></section>
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
