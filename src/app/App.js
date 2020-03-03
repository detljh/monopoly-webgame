import React from 'react';
import { Home } from './home';
import { Board } from './board';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route path='/home'   component={Home}/>
        <Route path='/board'   component={Board}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
