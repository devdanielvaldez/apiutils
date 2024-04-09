const fs = require('fs');
const path = require('path');

class MessageCatalog {
    constructor(defaultLanguage = 'en') {
        this.defaultLanguage = defaultLanguage;
        this.catalogs = {};
    }

    loadCatalog(language) {
        const currentDir = __dirname;
        const items = fs.readdirSync(currentDir);
        for (const item of items) {
            const itemPath = path.join(currentDir, item);
            if (fs.statSync(itemPath).isDirectory() && item === 'i18n') {
                const catalogPath = path.join(itemPath, `${language}.json`);
                if (fs.existsSync(catalogPath)) {
                    const catalogData = fs.readFileSync(catalogPath, 'utf8');
                    this.catalogs[language] = JSON.parse(catalogData);
                    return;
                } else {
                    console.error(`Catalog file not found for language '${language}'`);
                    return;
                }
            }
        }
        console.error(`'i18n' directory not found in the project.`);
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
