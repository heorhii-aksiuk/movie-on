import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import Section from '../components/Section/Section';
import MoviesList from '../components/MoviesList/MoviesList';
import fetchAPI from '../services/fetchAPI';
import { IDLE, PENDING, RESOLVED, REJECTED } from '../services/stateMachine';

function HomePage() {
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState(null);

  useEffect(() => {
    setStatus(PENDING);
    fetchAPI('/trending/movie/day')
      .then(response => {
        if (!response) throw Error('Oops...something went wrong :(');
        setTrendingMovies(response);
        setStatus(RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(REJECTED);
      });
  }, []);

  return (
    <>
      <Section title="Trending today">
        {status === RESOLVED && <MoviesList movies={trendingMovies} />}
        {status === PENDING && <Loader />}
        {status === REJECTED && <p>{error.message}</p>}
      </Section>
    </>
  );
}

export default HomePage;
