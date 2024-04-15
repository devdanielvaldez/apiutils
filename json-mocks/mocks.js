const fs = require('fs');
const path = require('path');
const { generateMocks } = require('./generateMocks');

function findSchemasDir(startDir) {
    let currentDir = startDir;

    while (currentDir !== '/') {
        const schemasDir = path.join(currentDir, 'schemas-validators');

        if (fs.existsSync(schemasDir) && fs.lstatSync(schemasDir).isDirectory()) {
            return schemasDir;
        }

        currentDir = path.dirname(currentDir);
    }

    throw new Error('The schemas-validators directory was not found');
}

async function _generateMocks(schemaName, objectLength) {
    const projectDir = __dirname;

    const schemasDir = findSchemasDir(projectDir);

    const mock = await generateMocks(schemaName, objectLength);
    const mockJSON = JSON.stringify(mock, null, 2);

    const filename = `${schemaName}-mock.json`;
    const filePath = path.join(schemasDir, filename);

    fs.writeFileSync(filePath, mockJSON);

    console.log(`Mock ${filename} generated in ${schemasDir}`);
}

module.exports = {
    _generateMocks
}