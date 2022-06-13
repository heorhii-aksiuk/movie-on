import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

function SearchBar({ onSubmitGet }) {
  const history = useHistory();
  const location = useLocation();
  const savedSearchQuery = new URLSearchParams(location.search).get('query');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (savedSearchQuery) setValue(savedSearchQuery);
    onSubmitGet(savedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitGet(value);
    history.push({
      ...location,
      search: `query=${value}`,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={value} type="text" />
      <Button type="submit">Search</Button>
    </form>
  );
}

SearchBar.propTypes = {
  onSubmitGet: PropTypes.func.isRequired,
};

export default SearchBar;
