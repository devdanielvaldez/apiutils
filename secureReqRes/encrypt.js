const crypto = require('crypto-js');
const { getApiKey } = require('./getApiKey');

function signAndEncryptResponse(data) {
    const apiKey = getApiKey();
    const dataToString = JSON.stringify(data);
    const signature = crypto.HmacSHA256(dataToString, apiKey).toString();
    const encryptedData = crypto.AES.encrypt(dataToString, apiKey).toString();
    return { signature, data: encryptedData };
}

function encryptResponse(req, res, next) {
    const originalSend = res.send;

    res.send = function(data) {
        if (res.headersSent) {
            return originalSend.call(this, data);
        }
        const encryptedResponse = signAndEncryptResponse(data);
        const base64Response = JSON.stringify(encryptedResponse);
        originalSend.call(this, base64Response);
    };

    next();
}

module.exports = {
    encryptResponse
}