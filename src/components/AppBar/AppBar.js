import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiFilmStrip } from 'react-icons/gi';
import s from './AppBar.module.css';

function AppBar() {
  return (
    <header className={s.header}>
      <nav className={s.navigation}>
        <NavLink exact to="/" className={s.logo}>
          <GiFilmStrip className={s.svg} />
          <span className={s.logoText}>MovieOn</span>
        </NavLink>
        <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default AppBar;
