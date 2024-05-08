const express = require("express");
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
  try {
    
    console.log('GET => ', req.params);
    console.log('GET => query ', req.getParameter('hub.challenge'));
    console.log('GET => header ', req.headers);

    res.status(200).send(req.getParameter('hub.challenge'))
  }
  catch (err) {
    console.log('GET Err=> ',err);
    res.status(405).json({ success: false, reason: err })
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
    console.log('POST Err=> ',err);
    res.status(405).json({ success: false, reason: err })
  }
});

module.exports = router;