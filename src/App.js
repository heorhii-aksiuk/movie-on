import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';
import AppBar from './components/AppBar/AppBar';
const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviePage = lazy(() =>
  import('./views/MoviePage' /* webpackChunkName: "MoviePage" */),
);
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */),
);
const NodFoundPage = lazy(() =>
  import('./views/NodFoundPage' /* webpackChunkName: "NodFoundPage" */),
);

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviePage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NodFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
