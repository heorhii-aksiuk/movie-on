import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import s from './SearchBar.module.css';

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
    <div className={s.formBox}>
      <div>
        <TextField
          onChange={handleChange}
          value={value}
          type="text"
          size="small"
          label="Part or full title"
          variant="outlined"
        ></TextField>
      </div>
      <div className={s.buttonBox}>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          startIcon={<Search />}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSubmitGet: PropTypes.func.isRequired,
};

export default SearchBar;
