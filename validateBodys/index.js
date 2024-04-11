const validateQuery = require('./validateQuerys');
const validateBody = require('./validateBody');
const convertYamlToJson = require('./YamlSchemasConvert');

const validateBodyReq = (schema) => {
    return validateBody(schema);
}

const validateQuerysReq = (schema) => {
    return validateQuery(schema);
}

const createSchemas = () => {
    convertYamlToJson();
}

module.exports = {
    validateBodyReq,
    validateQuerysReq,
    createSchemas
}