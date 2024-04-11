const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const findSchemasDir = require('./findSchemasDir');

function convertYamlToJson() {
    const projectDir = __dirname;

    const schemasDir = findSchemasDir(projectDir);

    const files = fs.readdirSync(schemasDir);

    files.forEach(file => {
        if (path.extname(file) === '.yaml') {
            const yamlFile = path.join(schemasDir, file);
            const yamlContent = fs.readFileSync(yamlFile, 'utf8');
            const schemas = yaml.load(yamlContent);

            Object.entries(schemas).forEach(([name, schema]) => {
                const jsonFile = path.join(schemasDir, `${name}.json`);
                fs.writeFileSync(jsonFile, JSON.stringify(schema, null, 2));
                console.log(`Converted ${file} to ${jsonFile}`);
                return;
            });
        }
    });
}

module.exports = convertYamlToJson;
