// API GATEWAY LINK
const config = {
    API_URLS: 'https://0410st8t43.execute-api.us-east-1.amazonaws.com/dev',
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_wT1Lb5YQI',
    USER_POOL_APP_CLIENT_ID: '58ul822ur1r3iphk0j409ms538',
    AMPLIFY_URL: "https://main.d2xon4urujrdqn.amplifyapp.com",
  };
  
  export default config;
  
// Deploy Amplify
// aws amplify start-job --app-id d2xon4urujrdqn --branch-name main --job-type RELEASE 

// Things to replace after a fresh deployment
// API_URLS, USERPOOLID, CLIENTID, AMPLIFY URL
// Once replace run replace the app-id in deploy amplify code and run it in terminal
