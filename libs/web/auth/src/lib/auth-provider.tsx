import { useNavigate } from 'react-router-dom';
import { Auth0Provider, AppState } from '@auth0/auth0-react';

/* eslint-disable-next-line */
export interface AuthProviderProps {
  domain: string;
  clientId: string;
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo ?? window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={props.domain}
      clientId={props.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {props.children}
    </Auth0Provider>
  );
}

export default AuthProvider;
