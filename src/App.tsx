import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { GameBoard } from './components/GameBoard';

export const App = () => {
  return (
    <Router>
      <NavBar />
      <div
        style={{
          maxWidth: '1012px',
          margin: '0 auto'
        }}
      >
        <Switch>
          <Route path='/'>
            <GameBoard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
