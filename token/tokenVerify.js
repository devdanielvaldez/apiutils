// tokenVerifier.js

const fs = require('fs');
const crypto = require('crypto');

function verifyToken(token, certPath) {
  const cert = fs.readFileSync(certPath);
  const publicKey = {
    key: cert,
  };

  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(encodedHeader + '.' + encodedPayload);
  const isVerified = verifier.verify(publicKey, signature, 'base64');

  if (!isVerified) {
    return { isValid: false, message: 'Token signature is invalid' };
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (payload.exp && payload.exp <= currentTimestamp) {
    return { isValid: false, message: 'Token has expired' };
  }

  return { isValid: true };
}

module.exports = verifyToken;