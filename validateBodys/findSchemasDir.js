const path = require('path');
const fs = require('fs');
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

module.exports = findSchemasDir;