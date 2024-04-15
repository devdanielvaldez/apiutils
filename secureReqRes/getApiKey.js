const colors = require('colors');

require('dotenv').config();

function getApiKey() {
    if (!process.env.API_KEY) {
        console.log(colors.red.bgBlue('Does not have an API Key, runs npx generate-key'));
    }
    return process.env.API_KEY;
}

module.exports = { getApiKey };