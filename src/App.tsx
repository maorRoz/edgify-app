import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Grid } from './components/Grid'

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
            <Grid />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
