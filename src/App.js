import React from 'react';
import './index.css';
import './App.css';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Edit from './pages/Edit';
import { Switch, Route } from 'react-router-dom';

function App() {
    return(
      <>
        <Header />
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/edit' component={Edit} />
          </Switch>
        <Footer />
      </>
    );
}

export default App;