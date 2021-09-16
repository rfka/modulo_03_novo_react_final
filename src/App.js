import React from 'react';
import './index.css';
import './App.css';
import Home from './pages/Home';
import View from './pages/View';
import Add from './pages/Add';
import Edit from './pages/Edit';
import { Switch, Route } from 'react-router-dom';

function App() {
    return(
      <>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/view/:id' component={View} />
            <Route path='/add' component={Add} />
          </Switch>
      </>
    );
}

export default App;