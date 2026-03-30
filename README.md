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

### Deploy the backend

You can deploy the backend to any PaaS (e.g. Render, Fly.io) or directly run on computer


#### Run on computer

1. Clone this repo

2. Install dependencies

   ```
   yarn  // or `npm install`
   ```

3. Create `.env` file under the root of this repo

   ```
   CLIENT_ID=<YOUR_CLIENT_ID>
   CLIENT_SECRET=<YOUR_CLIENT_SECRET>
   REDIRECT_URI=<YOUR_FRONTEND_ORIGIN>/home  # For example, https://dingyiyi0226.github.io/fantasy-baseball/home, https://localhost:3000/fantasy-baseball/home
   ORIGIN_WHITELIST=<YOUR_FRONTEND_ORIGIN>   # For example, https://dingyiyi0226.github.io, https://localhost:3000
   ```

3. Start the server

   ```
   yarn start  // or `npm run start`
   ```

4. The backend service domain is `https://localhost:4000` (or `http://localhost:4000` if `cert/` is not set up)


#### Deploy on Render (free)

1. Fork this repo on GitHub
2. Sign up at [render.com](https://render.com) and create a new **Web Service**
3. Connect your GitHub repo and select the forked repo
4. Configure the service:

   - **Runtime**: `Node`
   - **Build Command**: `yarn install`
   - **Start Command**: `yarn start`
   - **Instance Type**: `Free`

5. Under **Environment**, add the following variables:

   - `CLIENT_ID`: `<YOUR_CLIENT_ID>`
   - `CLIENT_SECRET`: `<YOUR_CLIENT_SECRET>`
   - `ORIGIN_WHITELIST`: `<YOUR_FRONTEND_ORIGIN>` (For example, `https://dingyiyi0226.github.io`)
   - `REDIRECT_URI`: `<YOUR_FRONTEND>/home` (For example, `https://dingyiyi0226.github.io/fantasy-baseball/home`)

6. Your backend service domain will be `https://<app_name>.onrender.com`

> **Note**: Free tier instances spin down after 15 minutes of inactivity (~30s cold start on next request).



## Reference
1. [edwarddistel/yahoo-fantasy-baseball-reader](https://github.com/edwarddistel/yahoo-fantasy-baseball-reader)
