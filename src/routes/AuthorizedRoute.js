import React from "react";

// API
import AuthService from '../api/authentication/auth.service';

// Utils

const AuthorizedRoute = ({components, ...rest}) => {
  const user = AuthService.getCurrentUser();
  return (
    <React.Fragment>
      {components[user.user_type]}
    </React.Fragment>
  );
}

export default AuthorizedRoute;