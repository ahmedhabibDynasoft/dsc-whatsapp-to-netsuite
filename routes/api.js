const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const { createOauthToken } = require("../util/auth.netsuite");

router.get('/', async (req, res) => {
  try {

    console.log('GET => ', req.params);
    console.log('GET => query ', req.query);
    console.log('GET => header ', req.headers);

    res.status(200).send(req.query['hub.challenge'])
  }
  catch (err) {
    console.log('GET Err=> ', err);
    res.status(405).json({ success: false, reason: err })
  }
});

router.get('/test', async (req, res) => {
  const authHeader = createOauthToken();
  let url = process.env.RESTLET_URL;

  const headers = new Headers({'Content-Length': 0, });
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', authHeader);

  console.log('headers', headers);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: { test: 1 }
    })
    .then(data => {return data.json()})
    .then((res) => {console.log('inside', res);})
    .catch(err => {console.log('inside err',err);})

    res.status(200).json({
      authHeader: authHeader,
      response,
      url
    })
  } catch (error) {
    res.status(200).json({
      authHeader: authHeader,
      error,
      url
    })
  }


});

router.post('/', async (req, res) => {
  try {
    const response = await fetch('https://tstdrv2207690.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4572&deploy=3&compid=TSTDRV2207690&h=a31756dad7fadab9ed25', {
      method: 'POST',
      params: req.params,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
      },
      body: req.body
    })

    console.log('POST => ', response);
    res.status(200).json({ success: true, data: response })
  }
  catch (err) {
    console.log('POST Err=> ', err);
    res.status(405).json({ success: false, reason: err })
  }
});

module.exports = router;