import React from 'react';
import { Home } from './home';
import { Game } from './game';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageTransition from 'react-router-page-transition';
import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <Route render={({ location }) => (
        <PageTransition timeout={700}>
          <Switch location={location}>
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
          </Switch>
        </PageTransition>
      )} />
    </BrowserRouter>
  );
}

export default App;
