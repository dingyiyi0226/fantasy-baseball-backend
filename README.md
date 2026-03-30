# Fantasy-baseball-backend
Backend repo for [fantasy-baseball](https://github.com/dingyiyi0226/fantasy-baseball)

The backend server is for two purposes:
1. Oauth 2.0 authorization flow
2. Api proxy server (CORS issues will occur when requests are made directly from the frontend)

## Setup

### Get API keys/secret from yahoo

1. Create an app at https://developer.yahoo.com/apps/
2. Parameters:

   - Application Name: fantasy-baseball (not important)  
   - Description: fantasy-baseball (not important)  
   - Homepage URL: https://dingyiyi0226.github.io (not important)  
   - Redirect URI: `<YOUR_FRONTEND>/home` (For example, https://dingyiyi0226.github.io/fantasy-baseball/home)  
   - OAuth Client Type: Confidential Client
   - API Permissions: Fantasy Sports, Read/Write
3. Copy the **Client ID** and **Client Secret**

### Run locally

1. Clone this repo

2. Install dependencies

   ```
   yarn
   ```

3. Create `.env` file under the root of this repo

   ```
   CLIENT_ID=<YOUR_CLIENT_ID>
   CLIENT_SECRET=<YOUR_CLIENT_SECRET>
   REDIRECT_URI=<YOUR_FRONTEND_ORIGIN>/home
   ORIGIN_WHITELIST=<YOUR_FRONTEND_ORIGIN>
   ```

4. Start the server

   ```
   yarn start
   ```

The server runs on `https://localhost:4000` if `cert/` is set up, otherwise `http://localhost:4000`.



## Reference
1. [edwarddistel/yahoo-fantasy-baseball-reader](https://github.com/edwarddistel/yahoo-fantasy-baseball-reader)
