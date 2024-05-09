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
    let signature = CryptoJS.HmacSHA256(baseString, key).toString(CryptoJS.enc.Base64);

    return `OAuth realm="${account}",oauth_consumer_key="${consumerKey}",oauth_token="${tokenId}",oauth_signature_method="HMAC-SHA256",oauth_timestamp="${timestamp}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_signature="${signature}"`;
}


module.exports = { createOauthToken };