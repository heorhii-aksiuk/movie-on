import React, { useState, useEffect } from 'react';
import Spinner from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  const [loaderTimeOut, setLoaderTimeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderTimeOut(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    loaderTimeOut && (
      <div className={s.container}>
        <Spinner
          type="Oval"
          color="#00BBFF"
          height={150}
          width={150}
          arialLabel="loading-indicator"
        />
      </div>
    )
  );
}

export default Loader;
