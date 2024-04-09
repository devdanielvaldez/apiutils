const crypto = require('crypto');

function encryptPassword(plain_text, rules) {
    if (!plain_text || typeof plain_text !== 'string') {
        throw new Error('Password must be a non-empty string');
    }

    if (rules.uppercase && !/[A-Z]/.test(plain_text)) {
        throw new Error('Password must contain at least one uppercase letter');
    }

    if (rules.lowercase && !/[a-z]/.test(plain_text)) {
        throw new Error('Password must contain at least one lowercase letter');
    }

    if (rules.specialCharacters && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(plain_text)) {
        throw new Error('Password must contain at least one special character');
    }

    if (rules.numbers && !/\d/.test(plain_text)) {
        throw new Error('Password must contain at least one number');
    }

    if (rules.containsPersonalInfo) {
        if (!rules.personalInfo || typeof rules.personalInfo !== 'object') {
            throw new Error('Personal info must be provided as an object');
        }

        const { name, last_name, born_date } = rules.personalInfo;
        if (!name || !last_name || !born_date) {
            throw new Error('Name, last name, and birth date must be provided');
        }

        const personalInfoStrings = [name, last_name, born_date].map(info => info.toString());
        if (personalInfoStrings.some(info => plain_text.includes(info))) {
            throw new Error('Password cannot contain personal information');
        }
    }

    const hashedPassword = crypto.createHash('sha256').update(plain_text).digest('base64');
    return hashedPassword;
}

module.exports = encryptPassword;