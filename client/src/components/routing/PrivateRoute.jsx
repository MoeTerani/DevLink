import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const Auth = useSelector((state) => state.auth);
  const { isAuthenticated, isLoading } = Auth;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !isLoading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
