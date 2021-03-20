import React, {useState, useEffect} from "react";
import {Route, Redirect } from "react-router-dom";
import path from "./path";

// API
import AuthService from '../api/authentication/auth.service';

const PrivateRoute = ({children, rest}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((isAuthen) => {
      setIsAuthenticated(isAuthen);
      setIsLoading(false);
    });
  }, []);

  return (
    <Route {...rest}>
      {(isLoading)? "Loading..." :
        ((isAuthenticated)? children : <Redirect to={path.loginPath}/>)
      }
    </Route>
  );
}

export default PrivateRoute;