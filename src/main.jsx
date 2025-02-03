import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import config from '../config';

Amplify.configure({
  Auth: {
    Cognito: {
      region: config.REGION, 
      userPoolClientId: config.USER_POOL_APP_CLIENT_ID,
      userPoolId: config.USER_POOL_ID,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authenticator.Provider>
    <App />
    </Authenticator.Provider>
  </React.StrictMode>
);
