import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: process.env.REACT_APP_REGION, 
      userPoolClientId: process.env.REACT_APP_USER_POOL_APP_CLIENT_ID,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
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
