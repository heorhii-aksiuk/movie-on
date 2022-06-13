import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { IDLE, PENDING, RESOLVED, REJECTED } from '../services/stateMachine';
import fetchAPI from '../services/fetchAPI';
import Section from '../components/Section/Section';
import MovieCard from '../components/MovieCard/MovieCard';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [prevLocation] = useState(location?.state?.from);
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setStatus(PENDING);
    fetchAPI(`/movie/${movieId}`)
      .then(response => {
        if (!response) throw Error('Oops...something went wrong :(');
        setMovie(response);
        setStatus(RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(REJECTED);
      });
  }, [movieId]);

  function goBack() {
    history.push(prevLocation ?? '/');
  }

  return (
    <div>
      <Section title="Movie info">
        <button onClick={goBack} type="button">
          Go back
        </button>
        <MovieCard
          movieId={movieId}
          movie={movie}
          status={status}
          error={error}
        />
      </Section>
    </div>
  );
}

export default MovieDetailsPage;
