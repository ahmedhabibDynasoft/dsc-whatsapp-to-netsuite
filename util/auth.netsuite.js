const OAuth = require('oauth-1.0a');
const crypto = require('crypto-js');

const createOAuthRequest = async (method, data ) => {
    const consumerKey = process.env.CONSUMER_KEY; // Client ID
    const consumerSecret = process.env.CONSUMER_SECRET; // Client Secret
    const tokenId = process.env.TOKEN_ID;
    const tokenSecret = process.env.TOKEN_SECRET;
    const restletUrl = process.env.RESTLET_URL;
    const accountId = process.env.ACCOUNT; // Realm
    const signature_method = process.env.SIGNATURE_METHOD

    const oauth = OAuth({
        consumer: {
            key: consumerKey,
            secret: consumerSecret,
        },
        signature_method: signature_method,
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
        method: method
    }

    const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

    const headers = {
        'Authorization': `${authHeader.Authorization}, realm="${accountId}"`,
        'Content-Type': 'application/json'
    }

    const options = {
        headers: headers,
        method: method,
        url: restletUrl,
        data: data
    };

    return options;
}


module.exports = { createOAuthRequest };