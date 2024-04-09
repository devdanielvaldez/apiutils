const generateToken = require('./tokenGenerator');

function refreshToken(token, certPath) {
  const [_, encodedPayload] = token.split('.');
  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());

  const newToken = generateToken(payload, certPath);

  return newToken.token;
}

module.exports = refreshToken;
