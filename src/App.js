import React from 'react';
import './index.css';
import './App.css';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import View from './pages/View';
import Add from './pages/Add';
import Edit from './pages/Edit';
import { Switch, Route } from 'react-router-dom';

function App() {
    return(
      <>
        <Header />
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/view/:id' component={View} />
            <Route path='/add' component={Add} />
          </Switch>
        <Footer />
      </>
    );
}

export default App;