function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    return /^[0-9]{10}$/.test(phoneNumber);
}

function isValidUrl(url) {
    const urlRegex = /^(?:https?):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
}

function isValidUUID(uuid) {
    const uuidRegex = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-5][a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
    return uuidRegex.test(uuid);
}

function isValidDateTime(dateTime) {
    return dateTime instanceof Date && !isNaN(dateTime.getTime());
}

function isValidPostalAddress(address) {
    return /^[a-zA-Z0-9\s\.,-]+$/.test(address);
}

function isValidPostalCode(postalCode) {
    return /^[0-9]{5}(?:-[0-9]{4})?$/.test(postalCode);
}

function isValidCreditCardNumber(cardNumber) {
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let even = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i), 10);

        if (even) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        even = !even;
    }

    return sum % 10 === 0;
}

function isValidFullName(name) {
    return /^[a-zA-Z\s'\-]+$/.test(name);
}

module.exports = {
    isValidEmail,
    isValidPhoneNumber,
    isValidUUID,
    isValidUrl,
    isValidDateTime,
    isValidPostalAddress,
    isValidPostalCode,
    isValidCreditCardNumber,
    isValidFullName
}