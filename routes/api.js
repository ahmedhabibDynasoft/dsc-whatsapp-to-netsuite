const express = require("express");
const router = express.Router();
const OAuth = require('oauth-1.0a');
const crypto = require('crypto-js');
const axios = require('axios');

const {responseHelper}=require('../helper/response_helper')

const {createOAuthRequest} = require('../util/auth.netsuite')



router.get('/', async (req, res) => {
  try {
    res.status(200).send(req.query['hub.challenge'])
  }
  catch (err) {
    console.log('GET Err=> ', err);
    res.status(405).json({ success: false, reason: err })
  }
});

// router.get('/test', async (req, res) => {
//   const consumerKey = process.env.CONSUMER_KEY; // Client ID
//   const consumerSecret = process.env.CONSUMER_SECRET; // Client Secret
//   const tokenId = process.env.TOKEN_ID;
//   const tokenSecret = process.env.TOKEN_SECRET;
//   const restletUrl = process.env.RESTLET_URL;
//   const accountId = process.env.ACCOUNT; // Realm

//   const oauth = OAuth({
//     consumer: {
//       key: consumerKey,
//       secret: consumerSecret,
//     },
//     signature_method: 'HMAC-SHA256',
//     hash_function(base_string, key) {
//       return crypto.HmacSHA256(base_string, key).toString(crypto.enc.Base64);
//     },
//   });

//   const token = {
//     key: tokenId,
//     secret: tokenSecret,
//   }

//   const requestData = {
//     url: restletUrl,
//     method: 'get',
//   }

//   const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

//   const headers = {
//     'Authorization': `${authHeader.Authorization}, realm="${accountId}"`,
//     'Content-Type': 'application/json'
//   }

//   const options = {
//     headers: headers,
//     method: 'get',
//     url: restletUrl
//   };

//   const data = await axios(options)
//     .then((response) => {
//       return response;
//     }, (error) => {
//       return error;
//     }).then((val) => console.log('val', val));

//   res.status(200).json({ success: true, data: data })
// })


router.post('/', async (req, res) => {

  const consumerKey = process.env.CONSUMER_KEY; // Client ID
  const consumerSecret = process.env.CONSUMER_SECRET; // Client Secret
  const tokenId = process.env.TOKEN_ID;
  const tokenSecret = process.env.TOKEN_SECRET;
  const restletUrl = process.env.RESTLET_URL;
  const accountId = process.env.ACCOUNT; // Realm
var filteredResp=responseHelper(req.body)
  const oauth = OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret,
    },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
      return crypto.HmacSHA256(base_string, key).toString(crypto.enc.Base64);
    },
  });

  const token = {
    key: tokenId,
    secret: tokenSecret,
  }

  const requestData = {
    url: restletUrl,
    method: 'get',
  }
  try {
    // const body = req.body;
    // const options = await createOAuthRequest('post', body);
    // const data = await axios(options)
    //   .then((response) => {
    //     return response;
    //   }, (error) => {
    //     return error;
    //   }).then((val) => val);


    // console.log('data => ', data);

    console.log('body', JSON.stringify(req.body));
    res.status(200).json({ success: true })
  }
  catch (err) {
    console.log('POST Err=> ', err);
    res.status(200).json({ success: false, reason: err })

  }

  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

  const headers = {
    'Authorization': `${authHeader.Authorization}, realm="${accountId}"`,
    'Content-Type': 'application/json'
  }

  const options = {
    headers: headers,
    method: 'get',
    url: restletUrl

  };

  const data = await axios(options)
    .then((response) => {
      return response;
    }, (error) => {
      return error;
    }).then((val) => console.log('val', val));

  res.status(200).json({ success: true, data: data })
});

module.exports = router;