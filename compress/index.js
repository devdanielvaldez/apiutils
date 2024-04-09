const compress = require('./compressResponse');

const compressResponse = (req, res, next) => {
    compress(req, res, next);
}

module.exports = {
    compressResponse
}