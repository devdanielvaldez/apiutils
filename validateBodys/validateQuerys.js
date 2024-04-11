const fs = require('fs');
const path = require('path');
const { isValidUUID, isValidDateTime, isValidPostalAddress, isValidPostalCode, isValidCreditCardNumber, isValidFullName, isValidEmail } = require('./validations');
const findSchemasDir = require('./findSchemaDirGlobal');

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


function validateQuery(schemaName) {
    return (req, res, next) => {
        const query = req.query;
        const schema = schemas[schemaName];
        if (!schema) {
            return res.status(500).json({ error: 'Schema not found' });
        }

        const validationResult = validateAgainstSchema(query, schema);

        if (!validationResult.valid) {
            return res.status(400).json({ error: 'Invalid query parameters', details: validationResult.errors });
        }

        next();
    };
}

function validateAgainstSchema(data, schema) {
    const errors = [];
    
    if (!schema || !schema.properties) {
        return { valid: false, errors: [{ field: 'schema', error: 'Schema is not defined or does not have properties' }] };
    }

    for (const [fieldName, fieldSchema] of Object.entries(schema.properties)) {
        if (data.hasOwnProperty(fieldName)) {
            const fieldValue = data[fieldName];
            const fieldType = fieldSchema.type;

            switch (fieldType) {
                case 'string':
                    if (typeof fieldValue !== 'string') {
                        errors.push({ field: fieldName, error: 'Field must be a string' });
                    } else {
                        if (fieldSchema.minLength && fieldValue.length < fieldSchema.minLength) {
                            errors.push({ field: fieldName, error: `Field length must be at least ${fieldSchema.minLength}` });
                        }
                        if (fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength) {
                            errors.push({ field: fieldName, error: `Field length must not exceed ${fieldSchema.maxLength}` });
                        }
                        if (fieldSchema.format === 'email' && !isValidEmail(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid email format' });
                        }
                        if (fieldSchema.format === 'phone' && !isValidPhoneNumber(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid phone number format' });
                        }
                        if (fieldSchema.format === 'uuid' && !isValidUUID(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid UUID format' });
                        }
                        if (fieldSchema.format === 'datetime' && !isValidDateTime(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid DateTime format' });
                        }
                        if (fieldSchema.format === 'url' && !isValidUrl(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid URL format' });
                        }
                        if (fieldSchema.format === 'postal-address' && !isValidPostalAddress(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid Postal Address format' });
                        }
                        if (fieldSchema.format === 'postal-code' && !isValidPostalCode(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid Postal Code format' });
                        }
                        if (fieldSchema.format === 'credit-card' && !isValidCreditCardNumber(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid Credit Card format' });
                        }
                        if (fieldSchema.format === 'name' && !isValidFullName(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Invalid Full Name format' });
                        }
                        if (fieldSchema.pattern && !new RegExp(fieldSchema.pattern).test(fieldValue)) {
                            errors.push({ field: fieldName, error: 'Field does not match the specified pattern' });
                        }
                    }
                    break;
                case 'number':
                    if (typeof fieldValue !== 'number' || isNaN(fieldValue)) {
                        errors.push({ field: fieldName, error: 'Field must be a number' });
                    } else {
                        if (fieldSchema.minimum && fieldValue < fieldSchema.minimum) {
                            errors.push({ field: fieldName, error: `Field must be at least ${fieldSchema.minimum}` });
                        }
                        if (fieldSchema.maximum && fieldValue > fieldSchema.maximum) {
                            errors.push({ field: fieldName, error: `Field must not exceed ${fieldSchema.maximum}` });
                        }
                    }
                    break;
                case 'boolean':
                    if (typeof fieldValue !== 'boolean') {
                        errors.push({ field: fieldName, error: 'Field must be a boolean' });
                    }
                    break;
                case 'array':
                    if (!Array.isArray(fieldValue)) {
                        errors.push({ field: fieldName, error: 'Field must be an array' });
                    } else {
                        if (fieldSchema.items && fieldValue.length > 0) {
                            fieldValue.forEach((item, index) => {
                                const itemErrors = validateAgainstSchema(item, fieldSchema.items);
                                itemErrors.forEach(itemError => {
                                    errors.push({ field: `${fieldName}[${index}]`, error: itemError.error });
                                });
                            });
                        }
                    }
                    break;
                case 'object':
                    if (typeof fieldValue !== 'object' || Array.isArray(fieldValue)) {
                        errors.push({ field: fieldName, error: 'Field must be an object' });
                    } else {
                        if (fieldSchema.properties) {
                            for (const [propName, propSchema] of Object.entries(fieldSchema.properties)) {
                                const propValue = fieldValue[propName];
                                const propErrors = validateAgainstSchema(propValue, propSchema);
                                propErrors.forEach(propError => {
                                    errors.push({ field: `${fieldName}.${propName}`, error: propError.error });
                                });
                            }
                        }
                    }
                    break;
                case 'date':
                    if (!(fieldValue instanceof Date) || isNaN(fieldValue.getTime())) {
                        errors.push({ field: fieldName, error: 'Field must be a date' });
                    }
                    break;
                case 'custom':
                    if (fieldSchema.validator && typeof fieldSchema.validator === 'function') {
                        const customValidationResult = fieldSchema.validator(fieldValue);
                        if (!customValidationResult) {
                            errors.push({ field: fieldName, error: 'Custom validation failed' });
                        }
                    }
                    break;
                default:
                    errors.push({ field: fieldName, error: 'Unsupported field type' });
                    break;
            }
        } else {
            if (schema.required && schema.required.includes(fieldName)) {
                errors.push({ field: fieldName, error: 'Field is required but not provided' });
            } else {
                // El campo no es requerido pero no está presente, no se hace nada
            }
        }
    }

    return { valid: errors.length === 0, errors };
}

module.exports = validateQuery;