import React from 'react';
import { Home } from './home';
import { Game } from './game';
import { BrowserRouter, Route } from 'react-router-dom';
import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home}/>
        <Route path='/game' component={Game}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
