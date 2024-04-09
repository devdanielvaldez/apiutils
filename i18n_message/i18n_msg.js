const fs = require('fs');
const path = require('path');

class MessageCatalog {
    constructor(defaultLanguage = 'en') {
        this.defaultLanguage = defaultLanguage;
        this.catalogs = {};
    }

    loadCatalog(language) {
        const catalogPath = path.join(__dirname, 'i18n', `${language}.json`);
        if (fs.existsSync(catalogPath)) {
            const catalogData = fs.readFileSync(catalogPath, 'utf8');
            this.catalogs[language] = JSON.parse(catalogData);
        } else {
            console.error(`Catalog file not found for language '${language}'`);
        }
    }

    getMessage(code, language) {
        if (!this.catalogs[language]) {
            this.loadCatalog(language);
        }
        const catalog = this.catalogs[language] || {};
        return catalog[code] || `Message not found for code '${code}' in language '${language}'`;
    }
}

module.exports = MessageCatalog;
