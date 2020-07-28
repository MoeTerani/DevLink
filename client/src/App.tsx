import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import NavBar from '../src/components/layout/NavBar';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Alert from '../src/components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from '../src/state/actions/auth-action';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    // return () => {
    //   console.log('APP component unmounted');
    // };
  }, []);
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Route exact path='/'>
          <Landing />
        </Route>
        <section className='container'>
          <Alert />
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
