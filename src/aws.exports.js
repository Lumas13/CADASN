//import Amplify from 'aws-amplify';
//import { CognitoUserPool } from 'amazon-cognito-identity-js';

const config = {
    Auth: {
        region: 'us-east-1',  // Your region
        userPoolId: 'us-east-1_weUdAr3IT',  // Your User Pool ID
        userPoolWebClientId: '267s4vg8rpn66p4jmc02vbok73',  // Your App Client ID
        oauth: {
            domain: 'https://cad-224015n.auth.us-east-1.amazoncognito.com',  // Hosted UI domain
            scope: ['openid', 'profile', 'email'],
            redirectSignIn: 'http://localhost:3000', // URL after successful login
            redirectSignOut: 'http://localhost:3000', // URL after sign-out
            responseType: 'code',
        },
    },
};

