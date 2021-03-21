import React, {useState, useEffect} from "react";
import {Route, Redirect } from "react-router-dom";
import path from "./path";

// @material-ui/core
import { makeStyles, useTheme  } from "@material-ui/core/styles";

// Icons
import LoadingPageIcon from '../assets/images/loading-page-icon.gif';

// API
import AuthService from '../api/authentication/auth.service';

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center'
  }
}));

const PrivateRoute = ({children, rest}) => {
  const classes = useStyles();

  // States
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
      {(isLoading)? 
        <div className={classes.iconWrapper}>
          <img src={LoadingPageIcon}/>
        </div> 
        :
        ((isAuthenticated)? children : <Redirect to={path.loginPath}/>)
      }
    </Route>
  );
}

export default PrivateRoute;