import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

function MoviesList({ movies }) {
  const location = useLocation();
  return (
    movies && (
      <ul className={s.list}>
        {movies.map(movie => (
          <li key={movie.id} className={s.item}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
              className={s.link}
            >
              <div>
                <img
                  className={s.img}
                  src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                <h3 className={s.title}>{movie.title}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
    }),
  ),
};

export default MoviesList;
