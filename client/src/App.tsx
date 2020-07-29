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
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/EditProfile';
import AddEducation from './components/profileForms/AddEducation';
import AddExperience from './components/profileForms/AddExperience';

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
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path='/add-education'
              component={AddEducation}
            />
          </Switch>
        </section>
      </div>
    </Router>
  );
};

export default App;
