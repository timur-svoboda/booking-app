import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@booking-app/web/auth';

import App from './app/app';
import { environment } from './environments/environment';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider
        domain={environment.auth0.domain}
        clientId={environment.auth0.clientId}
      >
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
