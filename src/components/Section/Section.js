import React from 'react';
import PropTypes from 'prop-types';
import s from './Section.module.css';

function Section({ title, children }) {
  return (
    <section className={s.section}>
      <div className={s.titleWrapper}>
        <h2 className={s.title}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;
