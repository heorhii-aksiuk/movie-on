import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch, Route } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import { PENDING, RESOLVED, REJECTED } from '../../services/stateMachine';

function MovieCard({ movieId, movie, status, error }) {
  const { url } = useRouteMatch();

  function getMovieRuntime() {
    if (movie) {
      const hours = String(Math.floor(movie.runtime / 60));
      const minutes = String(movie.runtime % 60).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  }

  return (
    <>
      {status === RESOLVED && (
        <>
          <div>
            <img
              src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
          </div>
          <div>
            <h3>{movie.title}</h3>
            <h4>{movie.tagline}</h4>
            <ul>
              <li>Vote: {movie.vote_average}/10</li>
              <li>Votes: {movie.vote_count}</li>
              <li>Release date: {movie.release_date}</li>
              <li>Runtime: {getMovieRuntime()}</li>
            </ul>
            <h4>Overview</h4>
            <p>{movie.overview}</p>
            <ul>
              Genres
              {movie.genres.map(genre => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
          <div>
            <h4>Additional information</h4>
            <ul>
              <li>
                <NavLink to={`${url}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
              </li>
            </ul>
          </div>

          <Route path="/movies/:movieId/cast">
            <Cast movieId={movieId} />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews movieId={movieId} />
          </Route>
        </>
      )}
      {status === PENDING && <Loader />}
      {status === REJECTED && <p>{error.message}</p>}
    </>
  );
}

MovieCard.propTypes = {
  movieId: PropTypes.string.isRequired,
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
    runtime: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
  status: PropTypes.string.isRequired,
  error: PropTypes.object,
};

export default MovieCard;
