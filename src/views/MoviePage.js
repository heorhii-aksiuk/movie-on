import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import Section from '../components/Section/Section';
import SearchBar from '../components/SearchBar/SearchBar';
import MoviesList from '../components/MoviesList/MoviesList';
import fetchAPI from '../services/fetchAPI';
import { IDLE, PENDING, RESOLVED, REJECTED } from '../services/stateMachine';

function MoviePage() {
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [searchedMovies, setSearchedMovies] = useState(null);

  function getSubmitValue(value) {
    setInputValue(value);
  }

  useEffect(() => {
    if (!inputValue) return;
    setStatus(PENDING);
    fetchAPI('/search/movie', `${inputValue}`)
      .then(response => {
        if (!response) throw Error('Oops...something went wrong :(');
        setSearchedMovies(response);
        setStatus(RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(REJECTED);
      });
  }, [inputValue]);

  return (
    <div>
      <Section title="Search your movie">
        <SearchBar onSubmitGet={getSubmitValue} />
        {status === RESOLVED && <MoviesList movies={searchedMovies} />}
        {status === IDLE && (
          <p>Use part or full movie title for search query</p>
        )}
        {status === PENDING && <Loader />}
        {status === REJECTED && <p>{error.message}</p>}
      </Section>
    </div>
  );
}

export default MoviePage;
