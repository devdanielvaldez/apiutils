const generateCertificate = require('./certGenerator');
const tokenGenerator = require('./tokenGenerator');
const isTokenVerify = require('./tokenVerify');
const refresh = require('./refreshToken');
const middleware = require('./tokenMiddleware');

const generateCert = () => {
    return generateCertificate();
}

const generateToken = (payload, expireIn) => {
    return tokenGenerator(payload, './cert-private/cert.pem', expireIn);
}

const verifyToken = (token) => {
    return isTokenVerify(token, './cert-private/cert.pem.pub');
}

const refreshToken = (token) => {
    return refresh(token, './cert-private/cert.pem');
}

const middlewareToken = () => {
    middleware('./cert-private/cert.pem.pub')
}

module.exports = {
    generateCert,
    generateToken,
    verifyToken,
    refreshToken,
    middlewareToken
}