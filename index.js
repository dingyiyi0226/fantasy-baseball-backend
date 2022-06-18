const axios = require('axios');
const cors = require('cors');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()


const TOKEN_ENDPOINT = 'https://api.login.yahoo.com/oauth2/get_token';
const API_ENDPOINT = 'https://fantasysports.yahooapis.com/fantasy/v2';
const AUTH_HEADER = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
const REDIRECT_URI = process.env.REDIRECT_URI;
const ORIGIN_WHITELIST = process.env.ORIGIN_WHITELIST;

const app = express();
app.use(cors({
  origin:[ORIGIN_WHITELIST,]
}));

// api proxy
app.use('/api',
  createProxyMiddleware({
    target: API_ENDPOINT,
    changeOrigin: true,
    pathRewrite: function (path, req) {  // tmp
      return path.replace('/api', '');
    }
  })
);

// authorization code -> access token
app.get('/token', (req, res) => {
  console.log('get token');
  const authCode = req.query.code;
  const requestBody = {
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
    code: authCode
  };
  const data = Object.keys(requestBody)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(requestBody[key]))
    .join('&');

  axios.post(TOKEN_ENDPOINT, data, {
    headers: {
      Authorization: `Basic ${AUTH_HEADER}`,
      'Content-Type':'application/x-www-form-urlencoded'
    },
  }).then(response => {
    console.log('Response', response.data);
    res.status(200).send(response.data);
  }).catch(error => {
    console.error('Error', error.config);
    console.error(error.response.data);
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    }
  });
});

// refresh token -> new access token
app.get('/refresh', (req, res) => {
  console.log('refresh token');
  const refresh_token = req.query.refresh_token;
  const requestBody = {
    redirect_uri: REDIRECT_URI,
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  };
  const data = Object.keys(requestBody)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(requestBody[key]))
    .join('&');

  axios.post(TOKEN_ENDPOINT, data, {
    headers: {
      Authorization: `Basic ${AUTH_HEADER}`,
      'Content-Type':'application/x-www-form-urlencoded'
    }
  }).then(response => {
    console.log('Response', response.data);
    res.status(200).send(response.data);
  }).catch(error => {
    console.error('Error', error.config);
    console.error(error.response.data);
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    }
  });
});

app.get('/test', (req, res) => {
  res.status(200).send('hello');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
