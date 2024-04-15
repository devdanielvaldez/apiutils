const crypto = require('crypto-js');
const { getApiKey } = require('./getApiKey');

function decryptAndVerifyResponse(payload) {
    console.log(payload)
    const apiKey = getApiKey();
    const decryptedData = crypto.AES.decrypt(payload.data, apiKey).toString(crypto.enc.Utf8);
    console.log(decryptedData)
    const calculatedSignature = crypto.HmacSHA256(decryptedData, apiKey).toString();
    const isValid = payload.signature === calculatedSignature
    if(!isValid) return "Signature not is valid";
    return { data: decryptedData };
}

function decryptRequest(req, res, next) {
    if (req.body.data) {
        try {
            req.body = decryptAndVerifyResponse(req.body.data);
            next();
        } catch (error) {
            console.error('Error decrypting request data:', error);
            res.status(400).json({ error: 'Bad Request', message: 'Error decrypting request data' });
        }
    } else {
        next();
    }
}

module.exports = {
    decryptRequest
}