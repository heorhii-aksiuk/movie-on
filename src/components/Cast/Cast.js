import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import fetchAPI from '../../services/fetchAPI';
import { IDLE, PENDING, RESOLVED, REJECTED } from '../../services/stateMachine';

function Cast({ movieId }) {
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    setStatus(PENDING);
    fetchAPI(`/movie/${movieId}/credits`)
      .then(credits => {
        if (!credits) throw Error('Oops...something went wrong :(');
        return credits.cast;
      })
      .then(response => {
        setCast(response);
        setStatus(RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(REJECTED);
      });
  }, [movieId]);

  return (
    <div>
      {status === RESOLVED && (
        <ul>
          {cast.map(actor => {
            return (
              <li key={actor.cast_id}>
                {actor.profile_path && (
                  <img
                    src={`https://www.themoviedb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                  ></img>
                )}
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
      {status === PENDING && <Loader />}
      {status === REJECTED && <p>{error.message}</p>}
    </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
