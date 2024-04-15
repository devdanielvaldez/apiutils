const fs = require('fs');
const path = require('path');
const { IAgenerateMocks } = require('./IA');

function findSchemasDir(rootDir) {
    function search(directory) {
        const files = fs.readdirSync(directory);

        if (files.includes('schemas-validators')) {
            return path.join(directory, 'schemas-validators');
        }

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const foundDir = search(filePath);
                if (foundDir) {
                    return foundDir;
                }
            }
        }

        return null;
    }

    return search(rootDir);
}

function findSchemas(dir) {
    const schemaFiles = [];

    function walk(directory) {
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                walk(filePath);
            } else if (path.extname(file) === '.json') {
                schemaFiles.push(filePath);
            }
        });
    }

    walk(dir);

    return schemaFiles;
}

const rootDir = path.resolve(__dirname, '..');

const schemasDir = findSchemasDir(rootDir);
const schemaFiles = findSchemas(schemasDir);

const schemas = {};

schemaFiles.forEach(file => {
    const schemaName = path.basename(file, '.json');
    const schemaData = fs.readFileSync(file, 'utf8');
    schemas[schemaName] = JSON.parse(schemaData);
});

async function generateMocks(schemaName, objectLength = 10) {
    const schema = schemas[schemaName];
    if (!schema) {
        return { error: 'Schema not found' };
    }

    if(objectLength > 10) {
        return { error: 'The size of the mock cannot be greater than 10 objects' }
    }

    const prompt = `generates a mock of ${objectLength} objects based on this JSON Schema: ${JSON.stringify(schema)}. Returns it as a JSON to save it to a JSON file. Add data from simulated people.`;

    const mock = await IAgenerateMocks(prompt);
    const resp = JSON.parse(removeTripleQuotes(mock.response));
    return resp;
}


function removeTripleQuotes(text) {
    return text.replace(/^```json\s+|```$/g, '');
}

module.exports = {
    generateMocks
}