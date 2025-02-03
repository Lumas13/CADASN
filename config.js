// API GATEWAY LINK
const config = {
    API_URLS: 'https://xq91wzy7s8.execute-api.us-east-1.amazonaws.com/dev',
    REGION: 'us-east-1',
    USER_POOL_ID: 'efeus-east-1_wNSAMFMsLfef',
    USER_POOL_APP_CLIENT_ID: '16mivs0rrbu49ls3euqs1tdi5l',
  };
  
  export default config;
  
// Deploy Amplify
// aws amplify start-job --app-id d2lub5hxhqlu2j --branch-name main --job-type RELEASE 

// Things to replace after a fresh deployment
// API_URLS Link
// .env user_pool_id and user_pool_app_client_id
// Once replace run replace the app-id in deploy amplify code and run it in terminal
