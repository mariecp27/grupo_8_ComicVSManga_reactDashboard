import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
import CategoriesInDb from './CategoriesInDb';
import LastProductInDb from './LastProductInDb';
import CounterSection from './CounterSection';
import SearchMovies from './SearchMovies';
import NotFound from './NotFound';
import ProductDetail from './ProductDetail'

function App() {
  return (
    <React.Fragment>
      <div id="wrapper">
        <SideBar />

        <Switch>
          <Route exact path="/">
            <ContentWrapper />
          </Route>
          <Route path="/GenresInDb">
            <CategoriesInDb />
          </Route>
          <Route path="/LastMovieInDb">
            <LastProductInDb />
          </Route>
          <Route path="/ContentRowMovies">
            <CounterSection />
          </Route>
          <Route path="/SearchMovies">
            <SearchMovies />
          </Route>
          <Route path="/ProductDetail/:id">
            <ProductDetail />
          </Route>
          <Route component = { NotFound } />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
