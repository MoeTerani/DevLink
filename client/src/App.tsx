import React from 'react';
import './App.css';
import NavBar from '../src/components/layout/NavBar';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Route exact path='/'>
          <Landing />
        </Route>
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};

export default App;
