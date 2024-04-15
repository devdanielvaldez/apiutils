const {
    generateCert,
    generateToken,
    verifyToken,
    refreshToken,
    middlewareToken
} = require('./token/index');
const {
    encrypt,
    decrypt
} = require('./password/index');
const {
    i18n_msg_manage
} = require('./i18n_message/index');
const {
    processMonitoring
} = require('./monitoring/index');
const {
    compressResponse
} = require('./compress/index');
const {
    validateBodyReq,
    validateQuerysReq
} = require('./validateBodys');
const {
    encryptResponse,
    decryptRequest
} = require('./secureReqRes/index');

module.export = {
    generateCert,
    generateToken,
    verifyToken,
    refreshToken,
    middlewareToken,
    encrypt,
    decrypt,
    i18n_msg_manage,
    processMonitoring,
    compressResponse,
    validateBodyReq,
    validateQuerysReq,
    encryptResponse,
    decryptRequest
}