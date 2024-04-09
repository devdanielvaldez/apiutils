const { Transform } = require('stream');
const { createDeflate } = require('zlib');

function compressResponse(req, res, next) {
    const acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding || !acceptEncoding.includes('gzip')) {
        return next();
    }

    res.setHeader('Content-Encoding', 'gzip');

    const compressStream = new Transform({
        transform(chunk, encoding, callback) {
            const compressedChunk = compressData(chunk);
            callback(null, compressedChunk);
        }
    });

    res.pipe(compressStream);
    next();
}

function compressData(data) {
    const deflateStream = createDeflate();
    const compressedData = deflateStream.write(data);
    deflateStream.end();
    return compressedData;
}

module.exports = compressResponse;