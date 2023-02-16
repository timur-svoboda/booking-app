import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface AuthRequiredProps {}

export function AuthRequired(props: AuthRequiredProps) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const redirectToLogIn = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  };

  React.useEffect(() => redirectToLogIn(), []);

  React.useEffect(() => redirectToLogIn(), [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : null;
}

export default AuthRequired;
