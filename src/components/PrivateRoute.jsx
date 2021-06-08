import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  const token = useSelector(state => state.user.token);

  return (
    <Route {...rest}>
      { token ? children
        : <Redirect
          to="/signin"
        />}
    </Route>
  );
}