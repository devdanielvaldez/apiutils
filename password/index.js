const encryptPassword = require('./encryptPassword');
const decryptPassword = require('./decryptPassword');

const encrypt = (plain_text, rules) => {
    encryptPassword(plain_text, rules);
}

const decrypt = (plain_text, hash_password) => {
    decryptPassword(plain_text, hash_password);
}

module.exports = {
    encrypt,
    decrypt
}