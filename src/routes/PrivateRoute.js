import React, {useState, useEffect, useContext} from "react";
import {Route, Redirect } from "react-router-dom";
import path from "./path";
import strings from '../configs/strings';

// i18next
import i18n from '../i18n';

// Context
import { themeStore } from '../contexts/theme-context';

// API
import AuthService from '../api/authentication/auth.service';

// Components
import LoadingPage from '../layouts/LoadingPage';

// Utils

const PrivateRoute = ({children, ...rest}) => {
  //const classes = useStyles();
  const {themeState, dispatchTheme} = useContext(themeStore);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((isAuthen) => {
      setIsAuthenticated(isAuthen);
      setIsLoading(false);
      if (isAuthen){
        const user = AuthService.getCurrentUser();
        if (user.language && i18n.language !== user.language.toLowerCase()){
          i18n.changeLanguage(user.language);
        }
        if (themeState && user.theme !== undefined && themeState.type !== user.theme){
          dispatchTheme({
            type: strings.setTheme,
            theme: user.theme
          })
        }
      }
    });
  });

  return (
    <Route {...rest}>
      {(isLoading)? 
        <LoadingPage/>
        :
        ((isAuthenticated)? children : <Redirect to={path.loginPath}/>)
      }
    </Route>
  );
}

export default PrivateRoute;