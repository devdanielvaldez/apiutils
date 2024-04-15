const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();
const colors = require('colors');

console.log(colors.rainbow('\n 🚀🔐  apiUtils.js  🔐🚀 \n'));
console.log('Please wait...');

const API_KEY_LENGTH = 32;

function generateApiKey() {
    console.log(colors.green.bold('🛡️  Generating API KEY...  🛡️'));
    return crypto.randomBytes(API_KEY_LENGTH).toString('hex');
}

function saveApiKeyToFile(apiKey) {
    console.log(colors.green.bold('🛡️  Saving API KEY...  🛡️'));
    fs.writeFileSync('.env', `API_KEY=${apiKey}`);
    console.log(colors.green.bold('🛡️  API KEY generated and saved  🛡️'));
    console.log(colors.green.bold('API KEY: ', apiKey));
    return;
}

function _generate() {
    const apiKey = generateApiKey();
    saveApiKeyToFile(apiKey);
}

_generate();

module.exports = {
    _generate
}
