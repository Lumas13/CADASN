// API GATEWAY LINK
const config = {
    API_URLS: 'https://t5tmva2d5l.execute-api.us-east-1.amazonaws.com/dev',
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_S5xr9gv7E',
    USER_POOL_APP_CLIENT_ID: '6tuj87g4fae2of9gppsjf3iic1',
    AMPLIFY_URL: "https://main.d1kdsrhv8vynd1.amplifyapp.com",
  };
  
  export default config;
  
// Deploy Amplify
// aws amplify start-job --app-id d1kdsrhv8vynd1 --branch-name main --job-type RELEASE 

// Things to replace after a fresh deployment
// API_URLS, USERPOOLID, CLIENTID, AMPLIFY URL
// Once replace run replace the app-id in deploy amplify code and run it in terminal
