const i18nMsg = require('./i18n_msg');

const i18n_msg_manage = (code, language) => {
    const i18n = new i18nMsg();
    return i18n.getMessage(code, language);
}

module.exports = {
    i18n_msg_manage
}