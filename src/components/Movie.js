import React from 'react';
import { Button } from 'react-bootstrap';

import classes from './Movie.module.css';

const Movie = (props) => {
  const id = `${props.id}`
  async function DeleteMovieHandler() {
    try {
      const response = await fetch(`https://react-app-cd331-default-rtdb.firebaseio.com/movies/${id}.json`, { method: 'DELETE' })
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <Button onClick={DeleteMovieHandler}>delete</Button>
    </li>
  );
};

export default Movie;
