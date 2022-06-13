const axios = require('axios');
const cors = require('cors');
const express = require('express');
require('dotenv').config()


const TOKEN_ENDPOINT = 'https://api.login.yahoo.com/oauth2/get_token';
const AUTH_HEADER = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
const REDIRECT_URI = 'oob';


const app = express();
app.use(cors({
  origin:['http://localhost:3000', 'https://dingyiyi0226.github.io']
}));

// authorization code -> access token
app.get('/token', (req, res) => {
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
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    }
  });
});

// refresh token -> new access token
app.get('/refresh', (req, res) => {
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
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    }
  });
});


app.listen(4000, () => {
  console.log('Server is up on port 4000');
});
