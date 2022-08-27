# Fantasy-baseball-backend
Backend repo for [fantasy-baseball](https://github.com/dingyiyi0226/fantasy-baseball)

The backend server is for two purposes:
1. Oauth 2.0 authorization flow
2. Api proxy server (CORS issues will occur when requests are made directly from the frontend)

## Environment Variables
- `CLIENT_ID`: yahoo api client ID
- `CLIENT_SECRET`: yahoo api client secret
- `REDIRECT_URI`: `<FRONTEND_URL>/redirect`. Ex. `https://dingyiyi0226.github.io/fantasy-baseball/redirect` 
- `ORIGIN_WHITELIST`: frontend site. Ex. `https://dingyiyi0226.github.io`
