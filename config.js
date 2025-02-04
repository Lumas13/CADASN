// API GATEWAY LINK
const config = {
    API_URLS: 'https://t5tmva2d5l.execute-api.us-east-1.amazonaws.com/dev',
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_S5xr9gv7E',
    USER_POOL_APP_CLIENT_ID: '6tuj87g4fae2of9gppsjf3iic1',
    AMPLIFY_URL: "https://main.d1kdsrhv8vynd1.amplifyapp.com",
  };
  
  export default config;

// How to deploy CDK
// 1. AWS Configure your credentials in AWS CLI in root
// 2. Change directory to CDK
// 3. cdk bootstrap (1st time use)
// 4. cdk synth (generate cloudformation template)
// 5. cdk deploy (deploy stack)

// After fresh deployment
// 1. Replace the variables using outputs from deployment
// 2. API_URLS, USER_POOL_ID, USER_POOL_APP_CLIENT_ID, AMPLIFY_URL
// 3. Replace the app-id in amplify start job and run in terminal to run job, "aws amplify start-job --app-id d1kdsrhv8vynd1 --branch-name main --job-type RELEASE"
// 4. Push the new variables to github 
// 5. Wait for amplify to deploy, onced deployed, the website is usable

// Things to take note
// Need personal github access token in CDK stack to deploy amplify during deployment