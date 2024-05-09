var CryptoJS = require("crypto-js");

const createOauthToken = () => {
    let account = process.env.ACCOUNT;
    let consumerKey = process.env.CONSUMER_KEY;
    let consumerSecret = process.env.CONSUMER_SECRET;
    let tokenId = process.env.TOKEN_ID;
    let tokenSecret = process.env.TOKEN_SECRET;

    let timestamp = new Date().getTime().toString().substring(0, 10);
    let nonce = CryptoJS.lib.WordArray.random(10).toString();
    let baseString = `${account}&${consumerKey}&${tokenId}&${nonce}&${timestamp}`;
    let key = `${consumerSecret}&${tokenSecret}`;
    let signature = "BR3gq2kyptA8igHhkP%2BS8kV86a3CL8xJpwMAQPQPHtA%3D"

    return `OAuth realm="TSTDRV2207690",oauth_consumer_key="1f0291c5c8c6adc0acc25079e4b39c8e0125b31553af7a263a075899dc653bdb",oauth_token="d2aec866cde0291df76bc03cdb08c8e6c97bfabe0cf48c09c84c4609f091d4f6",oauth_signature_method="HMAC-SHA256",oauth_timestamp="1715245415",oauth_nonce="7qWhckQJdJE",oauth_version="1.0",oauth_signature="BR3gq2kyptA8igHhkP%2BS8kV86a3CL8xJpw125MAQPQPHtA%3D"`;
}


module.exports = { createOauthToken };