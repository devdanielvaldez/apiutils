// tokenGenerator.js

const fs = require('fs');
const crypto = require('crypto');

function generateToken(payload, certPath, expiresIn = '1H') {
  const cert = fs.readFileSync(certPath);

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiry = calculateExpiry(currentTimestamp, expiresIn);

  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  const payloadWithExpiry = { ...payload, exp: expiry };
  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payloadWithExpiry));
  const dataToSign = encodedHeader + '.' + encodedPayload;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(dataToSign);
  const signature = signer.sign(cert, 'base64');

  return {
    token: dataToSign + '.' + signature,
  };
}

function calculateExpiry(currentTimestamp, expiresIn) {
  const multiplier = parseInt(expiresIn.slice(0, -1));
  const unit = expiresIn.slice(-1).toUpperCase();
  let expirySeconds;

  switch (unit) {
    case 'MI':
      expirySeconds = multiplier * 60;
      break;
    case 'H':
      expirySeconds = multiplier * 60 * 60;
      break;
    case 'S':
      expirySeconds = multiplier;
      break;
    case 'M':
      expirySeconds = multiplier * 60 * 60 * 24 * 30;
      break;
    case 'Y':
      expirySeconds = multiplier * 60 * 60 * 24 * 365;
      break;
    default:
      throw new Error('Invalid expiry format');
  }

  return currentTimestamp + expirySeconds;
}

function base64urlEncode(str) {
  return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

module.exports = generateToken;