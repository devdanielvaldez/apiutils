const { ESLint } = require('eslint');

async function checkUnusedVariablesAndLibraries() {
    const eslint = new ESLint();

    try {
        const results = await eslint.lintFiles(['.']);

        for (const result of results) {
            for (const message of result.messages) {
                if (message.severity === 2) {
                    console.log(`[Error]: ${message.message} at ${result.filePath}`);
                } else if (message.severity === 1) {
                    console.log(`[Warning]: ${message.message} at ${result.filePath}`);
                }
            }
        }
    } catch (error) {
        console.error('An error occurred while running ESLint:', error);
    }
}

module.exports = checkUnusedVariablesAndLibraries;