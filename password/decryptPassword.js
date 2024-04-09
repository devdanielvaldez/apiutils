const crypto = require('crypto');

function comparePasswords(plain_text, hashedPassword) {
    if (!plain_text || typeof plain_text !== 'string') {
        throw new Error('Password must be a non-empty string');
    }

    if (!hashedPassword || typeof hashedPassword !== 'string') {
        throw new Error('Hashed password must be a non-empty string');
    }

    const hashedInputPassword = crypto.createHash('sha256').update(plain_text).digest('base64');
    return hashedInputPassword === hashedPassword;
}

module.exports = comparePasswords;